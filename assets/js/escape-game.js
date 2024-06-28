$(function() {
    const story = $('#story');
    const choices = $('#choices');
    const SCENARIO_PATH = $('#scenarioPath').val();

    let scenarios;
    $.getJSON(SCENARIO_PATH).done(function(data) {
        scenarios = data;
        showScene('start');
    });
    
    function showScene(sceneId) {
        const scene = scenarios[sceneId];
        console.log(scene);
        story.text(scene.text);
        choices.empty();
        $.each(scene.choices, (idx, choice) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = () => showScene(choice.next);
            choices.append(button);
        });
    }
});
