$(document).on("ready", inicio);
function inicio () 
{
    $("#tipo_moviles").hide();
    $(".moviles").hide();
    $("#btn_info").on("click",mostrarInfo);
    $(".btn_moviles").on("click",mostrarDevice);
    
}
function mostrarInfo()
{
    $("#tipo_moviles").slideDown(2000);
      $("#btn_info").on("click",cerrarInfo);
      return
  }
function cerrarInfo()
{
    $("#tipo_moviles").slideUp(2000);
    return
}

function mostrarDevice(ids){
//console.log(ids);
var dato = ids.currentTarget.innerHTML;
if(dato == "Laptops")
{
   $("#laptops").slideDown(2000);
   $("#android").slideUp(); 
   $("#ios").slideUp();  
}else if(dato == "Android")
{
$("#android").slideDown(2000);
$("#laptops").slideUp(); 
$("#ios").slideUp();  
}
else if(dato == "IOS - Apple"){
    $("#ios").slideDown(2000);
    $("#laptops").slideUp(); 
    $("#android").slideUp();  
}
    
}