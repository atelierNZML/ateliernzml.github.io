$(function() {
    const postDataElem = $('#postData')
    const postsJson = postDataElem.text();
    let posts = JSON.parse(postsJson);
    let difficulty = postDataElem.data('difficulty');
    posts = posts.filter(function(post) {
        return post.difficulty == difficulty;
    });

    if (posts.length < 0) {
        return;
    }

    let recommendNazoList = $('#recommendNazoList');
    const numbers = Array.from({ length: posts.length }, (_, i) => i);
    console.log(numbers)
    for (let i=0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const nazoIndex = numbers[randomIndex];
        console.log(randomIndex, nazoIndex, posts[nazoIndex]);
        const postElem = getPostElem(posts[nazoIndex]);
        recommendNazoList.append(postElem);
        numbers.splice(randomIndex, 1);
    };

    $('#answerSubmitBtn').on('click', function() {
        const answer = $('.answer').data('answer');
        const userInput = $('#userAnswerInput').val();

        $('.result').hide();
        if (answer === userInput) {
            $('#answerCorrect').show();
        } else {
            $('#answerIncorrect').show();
        }
    });

    function getPostElem(post) {
        let cardElem = $('<a class="post-card mb-1"></a>').attr('href', post.url);
        
        let imgHolder = $('<div class="text-center post-img-holder"></div>');
        let nazoImg = $('<img class="post-img" alt="NAZO"/>')
            .attr('src', `https://drive.google.com/uc?id=${post.img_id}`)
            .attr('onerror', `this.src='https://lh3.googleusercontent.com/d/${post.img_id}'`);
        imgHolder.append(nazoImg)
        
        let cardTitleElem = $('<div class="post-list-title card-title"></div>');
        let postDate = $('<p class="post-date"></p>').text(getDate(post));
        let postTitle = $('<p class="card-htitle"></div>').text(post.title);
        cardTitleElem.append(postDate);
        cardTitleElem.append(postTitle);

        let categoryList = $('<div class="category-list"></div>');
        $.each(post.categories.split(','), function(_idx, category) {
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
})