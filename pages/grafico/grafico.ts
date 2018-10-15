import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
//import { LocationStrategy } from '@angular/common';

//declare var google;

@Component({
  selector: 'page-grafico',
  templateUrl: 'grafico.html',
})
export class GraficoPage {

   titulo:string;
  // tipoFoto:string;

  // items: any[] = [];
  // imgs: any[] = [];

  // // public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // // public doughnutChartData:number[] = [350, 450, 100];
  // // public doughnutChartType:string = 'doughnut';

  // public doughnutChartLabels:string[] = [];
  // public doughnutChartData:any[] = [];

  // public votosList:Array<any>;
  // public labelsList:Array<any>;

  // public doughnutChartType:string = 'doughnut';

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _cap: CargaArchivoProvider) {
      // this.tipoFoto = this.navParams.get("tipoFoto");

      // this.labelsList = new Array<any>();
      // this.votosList = new Array<any>();

      // this._cap.getImagenesListVoto(this.tipoFoto).subscribe(data=>{

      //   if(this.tipoFoto=="L") {
      //     this.titulo = "Cosas lindas mas votadas";
      //     this._cap.imagenesL = data;
      //     //this.dibujarPie();
      //    // this.dibujarPie2();


      //    this._cap.imagenesL.forEach(img => {

      //     this.labelsList.push(img.titulo);
      //     this.votosList.push(img.votos);
      //     //this.items.push([img.titulo,img.votos]);
      //     //this.imgs.push([img.img.toString()]);
      //   });
  
      //   this.doughnutChartLabels = this.labelsList;
      //   this.doughnutChartData = this.votosList;

      //   }
      //   else 
      //   {
      //     this.titulo = "Cosas feas mas votadas";
      //     this._cap.imagenesF = data;
      //     //this.dibujarBarras();
      //   }

      // });


      
  }

  // ionViewDidLoad() {

  //     this._cap.getImagenesListVoto(this.tipoFoto).subscribe(data=>{
  //       if(this.tipoFoto=="L") {
  //         this.titulo = "Cosas lindas mas votadas";
  //         this._cap.imagenesL = data;
  //         //this.dibujarPie();
  //         this.dibujarPie2();
  //       }
  //       else {
  //         this.titulo = "Cosas feas mas votadas";
  //         this._cap.imagenesF = data;
  //         //this.dibujarBarras();
  //       }
  //     });
  // }

  // public chartClicked(e:any):void {
  //   console.log(e);
  // }

  // // dibujarBarras(){
  // //   var items: any[] = [];
  // //   var data = new google.visualization.DataTable();
  // //   var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

  // //   // let i:number = 0;
  // //   // data.addColumn('string', 'Cosas');
  // //   // data.addColumn('number', 'Mas votadas');

  // //   if(this._cap.imagenesF.length > 0)
  // //   {
  // //     items.push(["Cosas","Votos"]);
  // //     this._cap.imagenesF.forEach(img => {

  // //       items.push([(img.titulo).toString(),img.votos]);
  // //     });

  // //     var options = {'title':'',
  // //     'height':600,
  // //     legend:{
  // //       position:'bottom',
  // //       maxLines:5
  // //     }
  // //     };

  // //     var datatable = google.visualization.arrayToDataTable(items);
  // //     chart.draw(datatable, options);

  // //     //chart.draw(data, options);
  // //     google.visualization.events.addListener(chart, 'select', function(e) {
  // //       //this.data.setSelection(this.chart.getSelection());
  // //      // console.log("seleccion");
  // //     });
  // //   }
  // // }

  // dibujarPie2(){
  //   if(this._cap.imagenesL.length > 0)
  //   {
  //    // this.items.push(['Cosas','Votos']);
  //     this._cap.imagenesL.forEach(img => {

  //       this.labelsList.push(img.titulo);
  //       this.votosList.push(img.votos);
  //       //this.items.push([img.titulo,img.votos]);
  //       //this.imgs.push([img.img.toString()]);
  //     });

  //     this.doughnutChartLabels = this.labelsList;
  //     this.doughnutChartData = this.votosList;
  //   }
  // }

  // // dibujarPie(){
  // //   var items: any[] = [];
  // //   var imgs: any[] = [];

  // //   if(this._cap.imagenesL.length > 0)
  // //   {
  // //     items.push(["Cosas","Votos"]);
  // //     this._cap.imagenesL.forEach(img => {

  // //       items.push([img.titulo,img.votos]);
  // //       imgs.push([img.img.toString()]);
  // //     });

  // //     var options = {'title':'',
  // //     'height':600,
  // //     legend:{
  // //       position:'top',
  // //       maxLines:5
  // //     },
  // //     is3D: true};

  // //     // Instantiate and draw our chart, passing in some options.
  // //     let chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  // //     var datatable = google.visualization.arrayToDataTable(items);

  // //    // google.visualization.events.addListener(chart, 'click', this.prueba);
  // //     chart.draw(datatable, options);

  // //     //function(e) {
  // //       //let selection = chart.getSelection();

  // //       //console.log(imgs[selection[0].row]);

  // //       //let modal = this.modalCtrl.create( VerImgPage, {imgPreview: imgs[selection[0].row]} );
  // //       //modal.present();

  // //       //this.mostrarModal(imgs[selection[0].row]);
  // //     //});
  // //   }
  // // }
  
  // // seleccion(){
  // //   let chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  // //   let selection = chart.getSelection();

  // //   console.log(selection);
  // // }

}
