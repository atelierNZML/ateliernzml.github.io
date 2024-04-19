$(function() {
    const postsJson = $('#minecraftPostData').text();
    let posts = JSON.parse(postsJson);
    let url = new URL(window.location.href);
    let params = url.searchParams;
    setDefaultValue();

    posts = posts.filter(function(post) {
        return filterCondition(post);
    });

    if (isFilterOn()) {
        $('#filterBtn').removeClass('btn-outline-secondary').addClass('btn-outline-success').html('<i class="fa-solid fa-filter"></i> 絞り込み中');
    }

    if (posts.length < 1) {
        $('#mapNotFound').show();
        return;
    }

    const perPage = params.get('per') || 12;
    const maxPages = Math.ceil(posts.length / perPage);
    let currentPage = params.get('page') || 1;
    if (currentPage > maxPages) {
        currentPage = maxPages;
    }
    if (maxPages > 1) {
        let paginationElem = getPaginationElem(max_pages=maxPages, current_page=currentPage);
        $('#minecraftPagination').append(paginationElem);
    }
    startPageNum = (currentPage - 1) * perPage;
    endPageNum = Math.max(startPageNum + perPage - 1, posts.length - 1)

    let nazoPostList = $('#minecraftPostList');
    for (let i=startPageNum; i<=endPageNum; i++) {
        if (i > posts.length - 1) break;
        let postElem = getPostElem(posts[i]);
        nazoPostList.append(postElem);
    }

    function getPostElem(post) {
        let cardElem = $('<a class="post-card minecraft mb-1"></a>').attr('href', post.url);
        
        let imgHolder = $('<div class="text-center post-img-holder"></div>');
        let nazoImg = $('<img class="post-img" alt="MinecraftMap"/>')
            .attr('src', `https://drive.google.com/uc?id=${post.img_id1}`)
            .attr('onerror', `this.src='https://lh3.googleusercontent.com/d/${post.img_id1}'`);
        imgHolder.append(nazoImg)
        
        let cardTitleElem = $('<div class="post-list-title card-title"></div>');
        let postDate = $('<p class="post-date"></p>').text(getDate(post));
        let players = $('<span></span>').text(post.players);
        let playersElem = $('<p class="players"></p>').append('<i class="fa-solid fa-users"></i>').append(players);
        postDate.append(playersElem);
        let postTitle = $('<p class="card-htitle"></div>').text(post.title);
        cardTitleElem.append(postDate);
        cardTitleElem.append(postTitle);

        let categoryList = $('<div class="category-list"></div>');
        $.each(post.categories, function(_idx, category) {
            categoryList.append($('<span class="badge bg-secondary py-1 px-2 me-2"></span>').text(category));
        });

        cardTitleElem.append(categoryList)

        cardElem.append(imgHolder);
        cardElem.append(cardTitleElem);
        return cardElem;
    }

    function getDate(post) {
        let datetime = post.date;
        let result = datetime.match(/^(\d+)\-(\d+)\-(\d+) (\d+):(\d+):(\d+) (\+\d+)$/);
        const year = result[1];
        const month = result[2];
        const date = result[3];
        // const hour = result[4];
        // const minute = result[5];
        return `${year}/${month}/${date}`;
    }

    function getPaginationElem(max_pages=2, current_page=1) {
        let ulElem = $('<ul class="pagination"></ul>');
        if (current_page > 1) {
            let previousLink = $('<a class="page-link"><span aria-hidden="true">«</span></a>').attr('href', getPageHref(current_page - 1));
            ulElem.append($('<li class="page-item"></li>').append(previousLink));
        }
    
        for (let i=1; i < max_pages+1; i++) {
            let pageLink = $('<a class="page-link"></a>').text(i).attr('href', getPageHref(i));
            let pageItem = $('<li class="page-item"></li>').append(pageLink);
            if (current_page == i) {
                pageItem.addClass('active');
            }
            ulElem.append(pageItem);
        }
    
        if (current_page < max_pages) {
            let nextLink = $('<a class="page-link"><span aria-hidden="true">»</span></a>').attr('href', getPageHref(current_page + 1));
            ulElem.append($('<li class="page-item"></li>').append(nextLink));
        }
        let navElem = $('<nav></nav>').append(ulElem);
        return navElem;
    }
    
    function getPageHref(page_num) {
        const queryParams = new URLSearchParams(window.location.search);
        let href = location.pathname + '?page=' + page_num;
        if (params.get('per')) {
            href = href + '&per=' + perPage;
        }
        for (const[key, value] of queryParams) {
            href = href + '&' + key + '=' + value;
        }
        return href
    }
});

function setDefaultValue() {
    const queryParams = new URLSearchParams(window.location.search);
    for (const[key, value] of queryParams) {
        $('[name="'+escapeSelector(key)+'"]').val(value);
    }
}

function isFilterOn() {
    let url = new URL(window.location.href);
    const params = url.searchParams;
    const difficulty = params.get('difficulty') || '';
    const players = params.get('players') || '';
    const keyword = params.get('kwd') || '';
    return difficulty != '' || players != '' || keyword != ''
}

function filterCondition(post) {
    let url = new URL(window.location.href);
    const params = url.searchParams;
    const difficulty = params.get('difficulty') || '';
    const players = params.get('players') || '';
    const keyword = params.get('kwd') || '';
    const keywords = keyword.split(' ');

    let difficulty_condition = post.difficulty == difficulty || difficulty == '';
    let players_condition = post.players.startsWith(players) || players == '';

    let keyword_condition = keyword == '';
    let categories = post.categories.join('');
    let title = post.title;
    for (const kwd of keywords) {
        if (categories.includes(kwd) || title.includes(kwd)) {
            keyword_condition = true;
            break;
        }
    };

    return difficulty_condition && players_condition && keyword_condition;
}

function escapeSelector(selector) {
    return selector.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
}