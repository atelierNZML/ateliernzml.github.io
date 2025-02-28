$(function() {
    $('#answerSubmitBtn').on('click', function() {
        const answer = $('.answer').data('answer');
        const userInput = $('#userAnswerInput').val();

        $('.result').hide();
        if (answer === userInput) {
            $('#answerCorrect').show();
        } else {
            $('#answerIncorrect').show();
        }
    })
})