let ulDOM = document.querySelector("#list");
let inputDOM = document.querySelector("#task");


let localArrays = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [{listtext: "Madde1", checked: false},{listtext: "Madde2", checked: true},{listtext: "Madde3", checked: false}];


window.onload=start();


function showTime(){
    let now = new Date();
    let saat = now.getHours();
    let dakika = now.getMinutes();
    let saniye = now.getSeconds();
    let gun = now.getDay();


    if(saat < 10){
        saat = "0" + saat;
    }
    if(dakika < 10){
        dakika = "0" + dakika;
    }
    if(saniye < 10){
        saniye = "0" + saniye; 
    }
    
    switch(gun){
        case 0:
            gun = "Pazar";
            break;
        case 1:
            gun="Pazartesi";
            break;
        case 2:
            gun="Salı";
            break;
        case 3:
            gun="Çarşamba";
            break;
        case 4:
            gun="Perşembe";
            break;
        case 5:
            gun = "Cuma";
            break;
        case 6:
            gun="Cumartesi";
            break;
    }
    let zaman = saat + ":" + dakika + ":" + saniye + " " + gun;
    document.querySelector('#saat').innerHTML=zaman;
    
}

setInterval(showTime, 1000);


function start(){
    for(let i = 0; i<localArrays.length; i++){
        let newChild = document.createElement("li");
        let newBtn = document.createElement("button");
        let listText = document.createElement("span");
        newBtn.classList.add("ml-auto", "rounded-circle");
        newBtn.innerHTML="X";
        newBtn.onclick = deleteElement;
        listText.innerHTML = localArrays[i].listtext;
        if(localArrays[i].checked === true){
            newChild.classList.add("checked");
        }
        newChild.append(listText);
        newChild.append(newBtn);
        
        newChild.onclick = checked;
        ulDOM.append(newChild);
    }
}

let input = document.querySelector("#task");
input.addEventListener("keyup", function(event){
	if(event.keyCode === 13){
		newElement();
		
	}
})


function newElement(){
    if(inputDOM.value != "" && inputDOM.value[0] != " "){
        let newChild = document.createElement("li");
        let newBtn = document.createElement("button");
        let listText = document.createElement("span");

        newChild.onclick = checked;
        newBtn.classList.add("ml-auto","rounded-circle");
        newBtn.innerHTML="X";
        newBtn.onclick = deleteElement;
        listText.innerHTML=inputDOM.value;
        newChild.append(listText);
        newChild.append(newBtn);
        ulDOM.append(newChild);
        $('#liveToast').toast('show');

        let yenitem = {listtext: listText.innerHTML, checked:false};
        localArrays.push(yenitem);
        localStorage.setItem('items', JSON.stringify(localArrays));
    
    }
    else{
        $('.error').toast('show');
    }
    inputDOM.value = "";
    
}

function deleteElement(e){
    let x = e.target.parentElement;
    let y = x.querySelector("span").innerHTML

    localArrays = localArrays.filter(x => x.listtext !== y);
    localStorage.setItem('items', JSON.stringify(localArrays));
    
    e.target.parentElement.remove();

    //this.parentElement.remove();

}


function checked(){
    this.classList.toggle("checked");
    let spanText= this.querySelector("span").innerHTML;
    
    function storageCheck(x){
        for(let i =0; i<x.length;i++){
            if(x[i].listtext === spanText){
                x[i].checked = !(x[i].checked);
            }
        }
        return x;
    }
    localArrays = storageCheck(localArrays);
    localStorage.setItem('items', JSON.stringify(localArrays));
}


function clearAll(){
    let allList = document.querySelectorAll("li");
    allList.forEach(e =>{e.remove()});
    localArrays = [];
    localStorage.setItem('items', JSON.stringify(localArrays));
}


function search(){
    araDom = document.querySelector("#ara");
    console.log(araDom.value)
    ulDOM.querySelectorAll("span").forEach(e =>{
        if(e.innerHTML.toUpperCase().indexOf(araDom.value.toUpperCase()) >-1){
            e.parentElement.style.display="";
        }
        else{
            e.parentElement.style.display="none";
        }
    });
}
