from api.serializers import OrderSerializer
from rest_framework.decorators import api_view, permission_classes
from api.models import Order, OrderItem, ShippingAddress, Product
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime

@api_view(['POST'])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No order Items'}, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        #create order
        order = Order.objects.create(
            user = user,
            paymentMethod  = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice']
        )

        #create shippingAddress

        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country']
        )

        #create orderItem and link to product relationship

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url
            )

            product.countInStock -= item.qty
            product.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)
    try:    
        if user.is_staff or order.user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail':'Not authorized to view this order'})
    
    except:
        return Response({'detail':'Order does not exist'})
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])

def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order was paid')