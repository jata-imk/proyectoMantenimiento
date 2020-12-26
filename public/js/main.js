(function () {
    document.addEventListener("DOMContentLoaded", function () {
        /* Codigo que se ejecutará una vez se haya cargado todo el HTML */

        //Funcion para mostrar contenido seleccionado
        function cambiarContenido(e) {
          for (const div of this.parentElement.children) {
            div.classList.remove("sidebar__item--active");
          }

          for (const div of tablero.children) {
            div.style.display = "none";
          }

          let target = document.getElementById(this.children[0].pathname.slice(1));

          this.classList.add("sidebar__item--active");

          target.style.display = "block";
          target.classList.add("swing-in-top-fwd");

          e.preventDefault();
        };

        let sidebar = document.getElementById("tablero__sidebar");
        let tablero = document.getElementById("tablero__info");

        for (const li of sidebar.children[0].children) {
          li.addEventListener("click", cambiarContenido)
        }
        
        // LineChart - Am4Charts
        let chartLine = am4core.create("chartdivLine", am4charts.XYChart);
        let chartLine2 = am4core.create("chartdivLine2", am4charts.XYChart);
        let chartLine3 = am4core.create("chartdivLine3", am4charts.XYChart);
        let chartLine4 = am4core.create("chartdivLine4", am4charts.XYChart);
        let chartLine5 = am4core.create("chartdivLine5", am4charts.XYChart);

        /* Create axes */
        let categoryAxisLine = chartLine.xAxes.push(new am4charts.CategoryAxis());
        categoryAxisLine.dataFields.category = "hora";

        let categoryAxisLine2 = chartLine2.xAxes.push(new am4charts.CategoryAxis());
        categoryAxisLine2.dataFields.category = "hora";

        let categoryAxisLine3 = chartLine3.xAxes.push(new am4charts.CategoryAxis());
        categoryAxisLine3.dataFields.category = "hora";

        let categoryAxisLine4 = chartLine4.xAxes.push(new am4charts.CategoryAxis());
        categoryAxisLine4.dataFields.category = "hora";

        let categoryAxisLine5 = chartLine5.xAxes.push(new am4charts.CategoryAxis());
        categoryAxisLine5.dataFields.category = "hora";

        /* Create value axis */
        let valueAxisLine = chartLine.yAxes.push(new am4charts.ValueAxis());
        let valueAxisLine2 = chartLine2.yAxes.push(new am4charts.ValueAxis());
        let valueAxisLine3 = chartLine3.yAxes.push(new am4charts.ValueAxis());
        let valueAxisLine4 = chartLine4.yAxes.push(new am4charts.ValueAxis());
        let valueAxisLine5 = chartLine5.yAxes.push(new am4charts.ValueAxis());

        /* Create series */
        var series1 = chartLine.series.push(new am4charts.LineSeries());
        series1.dataFields.valueY = "temperaturaLlenado";
        series1.dataFields.categoryX = "hora";
        series1.name = "Temperatura";
        series1.strokeWidth = 3;
        series1.tensionX = 0.7;
        series1.bullets.push(new am4charts.CircleBullet());
        series1.tooltipText = "[bold]{valueY}[/]";

        var series2 = chartLine2.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "corrienteLlenado";
        series2.dataFields.categoryX = "hora";
        series2.name = "Corriente";
        series2.strokeWidth = 3;
        series2.tensionX = 0.7;
        series2.bullets.push(new am4charts.CircleBullet());
        series2.tooltipText = "[bold]{valueY}[/]";

        var series3 = chartLine3.series.push(new am4charts.LineSeries());
        series3.dataFields.valueY = "distanciaLlenado";
        series3.dataFields.categoryX = "hora";
        series3.name = "Nivel Llenado Tanque";
        series3.strokeWidth = 3;
        series3.tensionX = 0.7;
        series3.bullets.push(new am4charts.CircleBullet());
        series3.tooltipText = "[bold]{valueY}[/]";

        var series4 = chartLine4.series.push(new am4charts.LineSeries());
        series4.dataFields.valueY = "temperaturaAgitador";
        series4.dataFields.categoryX = "hora";
        series4.name = "Temperatura Agitador";
        series4.strokeWidth = 3;
        series4.tensionX = 0.7;
        series4.bullets.push(new am4charts.CircleBullet());
        series4.tooltipText = "[bold]{valueY}[/]";

        var series5 = chartLine5.series.push(new am4charts.LineSeries());
        series5.dataFields.valueY = "corrienteAgitador";
        series5.dataFields.categoryX = "hora";
        series5.name = "Corriente Agitador";
        series5.strokeWidth = 3;
        series5.tensionX = 0.7;
        series5.bullets.push(new am4charts.CircleBullet());
        series5.tooltipText = "[bold]{valueY}[/]";

        /* Add legend */
        chartLine.legend = new am4charts.Legend();
        chartLine2.legend = new am4charts.Legend();
        chartLine3.legend = new am4charts.Legend();
        chartLine4.legend = new am4charts.Legend();
        chartLine5.legend = new am4charts.Legend();

        /* Create a cursor */
        chartLine.cursor = new am4charts.XYCursor();
        chartLine2.cursor = new am4charts.XYCursor();
        chartLine3.cursor = new am4charts.XYCursor();
        chartLine4.cursor = new am4charts.XYCursor();
        chartLine5.cursor = new am4charts.XYCursor();

        //Creamos el objeto par realizar las peticiones HTTP
        var xhr = new XMLHttpRequest();

        const temperatura = document.getElementById("temperatura");
        const corriente = document.getElementById("corriente");
        const vibracion = document.getElementById("vibracion");
        const nivelTanque = document.getElementById("nivelTanque");
        const temperaturaAgitador = document.getElementById("temperaturaAgitador");
        const corrienteAgitador = document.getElementById("corrienteAgitador");
        const vibracionAgitador = document.getElementById("vibracionAgitador");

        let programa = function() {
          //Abrimos la conexion
          xhr.open("GET", "/api/v1/data/last", false);

          xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
              let respuesta = JSON.parse(xhr.responseText);

              temperatura.textContent = `${respuesta.data[0].temperaturaLlenado} °C`;
              corriente.textContent = `${respuesta.data[0].corrienteLlenado} A`;

              let txtVibracion = "";
              respuesta.data[0].vibracionLlenado == true ? txtVibracion = "Activada" : txtVibracion = "Desactivada";
              vibracion.textContent = `${txtVibracion}`;

              nivelTanque.textContent = `${respuesta.data[0].distanciaLlenado} cm`;

              temperaturaAgitador.textContent = `${respuesta.data[0].temperaturaAgitador} °C`;
              corrienteAgitador.textContent = `${respuesta.data[0].corrienteAgitador} A`;

              let txtVibracionAgitador = "";
              respuesta.data[0].vibracionAgitador == true ? txtVibracionAgitador = "Activada" : txtVibracionAgitador = "Desactivada";
              vibracionAgitador.textContent = `${txtVibracionAgitador}`;
            }
          };

          //Realizamos la peticion
          xhr.send();
        }

        let programaGraficas = function() {
          //Abrimos la conexion
          xhr.open("GET", "/api/v1/data/last?qty=10", true);

          xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
              var respuesta = JSON.parse(xhr.responseText);
              var dataJson = respuesta.data;

              /* Add data */
              chartLine.data = dataJson;
              chartLine2.data = dataJson;
              chartLine3.data = dataJson;
              chartLine4.data = dataJson;
              chartLine5.data = dataJson;
            }
          };

          //Realizamos la peticion
          xhr.send();          
        }

        programa();
        programaGraficas();

        //Se actualizan los datos cada 5s
        setInterval( () => {
          programa();
          programaGraficas();
        }, 15000 );
    });
})();