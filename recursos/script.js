var almacen=[];
var subTotal=[];
var fact=[];
var cant=[];
const xhr = new XMLHttpRequest();
var cat='';

xhr.onreadystatechange=function(){
    if (xhr.readyState==4){
        if(xhr.status==200){
            
            cat=xhr.responseText;
            
        }
        if(xhr.status==404){
            console.log('File or resource not found');
        }
    }
};

xhr.open('get','recursos/catalogo.txt',true);
//xhr.responseType='text';
xhr.send();


function Articulo(Nombre,Cantidad,Precio,Imagen){

    this.Nombre=Nombre;
    this.Cantidad=Cantidad;
    this.Precio=Precio;
    this.Imagen=Imagen;
}

function cargarCatalogo(){

    var txt=cat.split("\r\n");
    var indice=[];
    var merc=[];
    var cont=0;
    var ubi=0;
    var act=0;
    for(i in txt){
        if((txt[i].charAt(0)=='.')&&(cont==0)){
            indice.push(txt[i].slice(1));
            //console.log('primero');
            cont++;
        }
        else if((txt[i].charAt(0)=='.')&&(cont>0)){
            indice.push(txt[i].slice(1));
            //console.log('segundo');
            //console.log(ubi);
            //console.log(act);
            almacen[cont-1]=merc.slice(ubi,act);
            //console.log(almacen);
            cont++;
            ubi=act;
        }
        
        if(txt[i].charAt(0)=='-'){
            var strtemp=txt[i].slice(1);
            var datatemp=strtemp.split(';');
            var temp=new Articulo(datatemp[0],datatemp[1],datatemp[2],datatemp[3]);
            merc.push(temp);
            //console.log(merc[0]);
            act=merc.length;
        }
    }

    almacen[cont-1]=merc.slice(ubi,act);

    //console.log(indice);

    var selectList=document.getElementById("catalogo");
    //Create and append the options
    for (var i = 0; i < indice.length; i++) {
        var option = document.createElement("option");
        option.value = indice[i];
        option.text = indice[i];
        selectList.appendChild(option);
    }



}

function cargarCB(){

    //Cargando articulos
    var index=document.getElementById('catalogo').selectedIndex;
    index--;

    var btn1=document.getElementById('btn1');
    var inventario=document.getElementById("inventario");
    inventario.innerHTML="";
    //var img=document.getElementById('img1');


    for(a in almacen[index]){
            var option = document.createElement("p");
            option.id = "Item"+(a);
            var img=document.createElement('img');
            img.id="Img"+(a);
            img.className="imgItem"
            img.src=almacen[index][a].Imagen;
            var btn=document.createElement('button');
            btn.id="btn"+(a);
            btn.className="addItem";
            
            var btnAdd=document.createElement('img');
            btnAdd.id="img"+(a);
            btnAdd.className="addIcon";
            btnAdd.src="recursos/add.png";

            btnAdd.setAttribute("onclick","facturar(this.id)");
            //console.log(almacen[index][a].Imagen);
            btn.appendChild(btnAdd);
            option.innerHTML =img.outerHTML+"Articulo:"+almacen[index][a].Nombre+"&emsp;Cant: "+almacen[index][a].Cantidad+"&emsp;USD: "+almacen[index][a].Precio+"&emsp;"+btn.outerHTML;
            //console.log(option.outerHTML);
            inventario.appendChild(option);

    }

}

function facturar(num){
    var temp=num.slice(3);
    var index=document.getElementById('catalogo').selectedIndex;
    index--;
    var precio=almacen[index][temp].Precio;
    var img=document.createElement('img');
    img.id="Img"+(a);
    img.className="imgItem"
    img.src=almacen[index][temp].Imagen;

var tabla=document.getElementById('resumen');
var row=tabla.insertRow(0);

var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);

// Add some text to the new cells:

var prod=almacen[index][temp].Nombre;
/*
var count = {};
fact.forEach(function(i) { count[i] = (count[i]||0) + 1;});
console.log(count);
*/
cell1.innerHTML = 1;
cell2.innerHTML = img.outerHTML;
cell3.innerHTML = almacen[index][temp].Nombre;
cell4.innerHTML = almacen[index][temp].Precio;


subTotal.push(Math.floor(precio));
var valSt=0;

for(i in subTotal){
    valSt+=subTotal[i];
}

var iva=valSt*0.12;
var tot=iva+valSt;
var iva2=iva.toFixed(2);
document.getElementById('iva').innerText="I.V.A:"+iva2;
document.getElementById('subtotal').innerText="SubTotal:"+valSt;
document.getElementById('total').innerText="TOTAL:"+tot;


}