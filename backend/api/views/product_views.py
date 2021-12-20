from django.core import paginator
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from api.products import products
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from api.serializers import ProductSerializer
from api.models import Product, Review


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    print('query:', query)
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page':page, 'pages':paginator.num_pages})

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReview(request, pk):
    user = request.user
    product = Product.objects.get(_id = pk)
    data = request.data
    #1 review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        return Response({'detail':'Product review already given'}, status = status.HTTP_400_BAD_REQUEST)
    #2 rating missing
    elif data['rating'] == 0:
        return Response({'detail':'Please select a rating'}, status=status.HTTP_400_BAD_REQUEST)

    #3 create review
    else:
        review = Review.objects.create(
                    user = user,
                    product = product,
                    name = user.first_name,
                    rating = data['rating'],
                    comment = data['comment']
                )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0

        for i in reviews:
            total += i.rating
        
        product.rating = total / len(reviews)
        product.save()

        return Response('Review added')


        