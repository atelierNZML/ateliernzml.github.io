$(function() {
    const image = $('#image');
    const story = $('#story');
    const question = $('#question');
    const choices = $('#choices');
    const SCENARIO_PATH = $('#scenarioPath').val();

    let scenarios;
    $.getJSON(SCENARIO_PATH).done(function(data) {
        scenarios = data;
        showScene('start');
    });
    
    function showScene(sceneId) {
        resetScene();
        const scene = scenarios[sceneId];
        if (!scene) { 
            showError();
            return;
        }

        story.html(scene.message);
        question.html(scene.question);
        if (scene) {
            image.attr('src', getImageUrl(scene.img_id));
        }
        $.each(scene.choices, (idx, choice) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = () => showScene(choice.next);
            choices.append(button);
        });
    }

    function resetScene() {
        story.html('');
        question.html('');
        image.attr('src', '');
        choices.empty();
    }

    function showError() {
        story.html('選択肢の先が見つかりませんでした。');
    }
});

function getImageUrl(imgId) {
    return `https://lh3.googleusercontent.com/d/${imgId}`;
}
