function changeMap(city){
    $.ajax({
        url: `/ajax/getGraph?city=${city}`,
        success: function(g){
            console.log('AJAX SUCCEED');

            // for(let i = 0; i < zoomButtons.length; i++){
            //     zoomButtons[i].hidden = false;
            // }

            document.getElementById('clear_points').click();

            reDrawGraph(g, 0, 0, 1);

            reDrawSvg();

            isSvgDrawn = true;
            isGraphDrawn = true;
            graph = g;
        }
    })
}

let city_chooser = document.getElementById('city_chooser');
city_chooser.addEventListener('change', function(event){
    if (graph) {
        let city = city_chooser.options[city_chooser.selectedIndex].value;
        console.log('City changed to ' + city);
        changeMap(city);
    }
});