import React from 'react';
import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function Paginate({pages, page, keyword=''}) {
    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&page=')[0]
    }
    return (pages>1 &&
        <div>
            <Pagination>
                {[...Array(pages).keys()].map((x)=>(
                    <LinkContainer
                    key={x+1}
                    to={`/?keyword=${keyword}&page=${x+1}`}
                    >
                    <Pagination.Item
                    key={x+1}
                    active={(x+1)===page}
                    >
                        {x+1}
                    </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        </div>
    )
}

export default Paginate
