/**
 * Created by a on 8/26/15.

 */
var todo = [
    {id:1, task:"task1", status:true, delete:false},
    {id:2, task:"task2", status:false, delete:false},
    {id:3, task:"task3", status:true, delete:false}
];
var id:number =3;

function display(){

    var d = document.createElement("div");
    d.setAttribute("id","frame");
    document.body.appendChild(d);
    var base = document.getElementById("frame");



    var h = document.createElement("h1");
    h.setAttribute("id","head");
    base.appendChild(h);
    var htext = document.getElementById("head");
    htext.innerHTML = "To Do List";

    for (var i in todo){
        if(!todo[i].delete) {
            var para = document.createElement("p");
            para.setAttribute("id", i);
            para.innerHTML = todo[i].task;

            base.appendChild(para);
            document.getElementById(i).style.display = "inline";
            var chk = document.createElement("input");
            chk.setAttribute("type", "checkbox");
            chk.setAttribute("id", "chk" + i);
            chk.setAttribute("value", i);
            chk.addEventListener("change", modify, false);
            base.appendChild(chk);

            var temp:any = document.getElementById("chk" + i);
            temp.checked = todo[i].status;

            var textnode = document.createElement('p');
            base.appendChild(textnode);
        }

    }

function modify(e){
    var val = e.target.value;
    //alert(val);
    todo[val].status = !todo[val].status;
}



}
function headdis()
{
    var d2 = document.createElement("div");
    d2.setAttribute("id","panel");
    document.body.appendChild(d2);
    var base2 = document.getElementById("panel");

    var tbox = document.createElement("input");
    tbox.setAttribute("type", "text");
    tbox.setAttribute("id", "task");
    base2.appendChild(tbox);

    var tbt = document.createElement("input");
    tbt.setAttribute("type", "button");
    tbt.setAttribute("id", "btn");
    tbt.setAttribute("value", "Add a task");
    tbt.addEventListener("click",add,false);
    base2.appendChild(tbt);

    var tbt2 = document.createElement("input");
    tbt2.setAttribute("type", "button");
    tbt2.setAttribute("id", "btn");
    tbt2.setAttribute("value", "Remove All Completed Tasks");
    tbt2.addEventListener("click",remove,false);
    base2.appendChild(tbt2);
}


display();
headdis();

function remove(){
    for (var i=0;i<todo.length;i++){
        if(todo[i].status){

            todo[i].delete=true;
        }
    }
    refresh();
}

function add()
{
    id++;
    var temp:any = document.getElementById("task");
    if (temp.value=="")
        temp.value="New Blank Task";
    todo.push({id:id,task:temp.value,status:false,delete:false});
    refresh();

}
function refresh(){
    document.body.removeChild(document.getElementById('frame'));
    document.body.removeChild(document.getElementById('panel'));
    display();
    headdis();
}