let flightData = [
    {
       'src': 'Krypton',
       'dest': 'Neon',
       'dep': '12:20',
       'arr': '14:20',
       'price': '4250'
    },
    {
        'src': 'Xenone',
        'dest': 'Zircon',
        'dep': '01:00',
        'arr': '03:40',
        'price': '1575'
     },
     {
        'src': 'Neon',
        'dest': 'Radiym',
        'dep': '15:10',
        'arr': '19:50',
        'price': '6510'
     },
     {
        'src': 'Plutona',
        'dest': 'Faxium',
        'dep': '13:45',
        'arr': '16:20',
        'price': '2520'
     },
     {
        'src': 'Zircon',
        'dest': 'Mercuria',
        'dep': '17:20',
        'arr': '20:00',
        'price': '5410'
     },
     {
        'src': 'Sulfura',
        'dest': 'Krypton',
        'dep': '07:15',
        'arr': '12:25',
        'price': '5000'
     },
     {
        'src': 'Xenone',
        'dest': 'Mercuria',
        'dep': '21:00',
        'arr': '03:50',
        'price': '3500'
     },
     {
        'src': 'Hydra',
        'dest': 'Marx',
        'dep': '04:01',
        'arr': '20:00',
        'price': '2650'
     },
];


document.addEventListener('DOMContentLoaded', function() {
    let wrapper = document.getElementsByClassName('wrapper')[0];
    for (let i = 0; i < flightData.length; i++) {
        let str = `<div class="data" onClick="bookFlight(this)"=>
                    <span>${flightData[i].src}</span>
                    <span>${flightData[i].dest}</span>
                    <span>${flightData[i].dep}</span>
                    <span>${flightData[i].arr}</span>
                    <span>${flightData[i].price}</span>
                </div>`;
        wrapper.innerHTML += str;
    }
    document.getElementsByClassName('selected-flight')[0].innerHTML = `<span>BOM - CCU</span> <span>12:12 - 14:12</span>`;
}, false);

let src, dest, dep, arr, price, adult, children, travelClass, date, addons;

function bookFlight(e) {
   details = e.children;
   src = details[0].innerHTML;
   dest = details[1].innerHTML;
   dep = details[2].innerHTML;
   arr = details[3].innerHTML;
   price = details[4].innerHTML;
   (document.getElementsByClassName('flight-list')[0]).style.display = "none";
   document.getElementsByClassName('selected-flight')[0].innerHTML = `<span>${src} - ${dest}</span> <span>${dep} - ${arr}</span>`;
   (document.getElementsByClassName('container')[0]).style.display = "grid";
}

function showReceipt() {
   adult = parseInt(document.getElementById('adult').value);
   children = parseInt(document.getElementById('child').value);
   travelClass = document.getElementById('aukaat').value;
   date = document.getElementById('date').value;
   addons = "";
   if (travelClass === '') {
      alert('Please choose a travel class.');
      return;
   }
   if (adult === '' || children === '') {
      alert('Please enter number of adults/children.');
      return;
   }
   if (date === '') {
      alert('Please select a date.');
      return;
   }
   if (adult > 10 || children > 10) {
      alert('Maximum number of adults/children is 10.');
      return;
   }
   let addonList = (document.getElementsByClassName('options')[0]).children;
   let addonCount = 0;
   for (let i = 0; i < addonList.length; i += 2) {
      if (addonList[i].checked) {
         addons += addonList[i+1].innerText + "<br>"
         addonCount += 1;
      }
   }
   if (addons.length > 0)
      addons = addons.substr(0, addons.length - 4);
   else addons = "None";

   price = parseInt(price);
   price = price + (addonCount * 300);
   if (travelClass === 'Business Class') price += 500;
   else if (travelClass === 'First Class') price += 1000;
   price = price * (adult + 0.5 * children);

   (document.getElementsByClassName('flight-data')[0]).innerHTML = `
      <div> Route </div>
      <div> ${src} - ${dest} </div>
      <div> Departure </div>
      <div> ${dep} </div>
      <div> Arrival </div>
      <div> ${arr} </div>
      <div> Adults </div>
      <div> ${adult} </div>
      <div> Children </div>
      <div> ${children} </div>
      <div> Class </div>
      <div> ${travelClass} </div>
      <div> Travel Date </div>
      <div> ${date} </div>
      <div> Addons </div>
      <div> ${addons} </div>
      <div> Total Fare </div>
      <div> ${price} Sb</div>`;
   (document.getElementsByClassName('flight-list')[0]).style.display = "none";
   (document.getElementsByClassName('container')[0]).style.display = "none";
   (document.getElementsByClassName('receipt')[0]).style.display = "grid";
}

function search(val, type) {
   let flightDataNew;
   if (val.trim() === "") flightDataNew = flightData;
   else {
      flightDataNew = flightData.filter(data => {
         if (type === 1)
            return data.src.toLowerCase() === val.toLowerCase();
         else
            return data.dest.toLowerCase() === val.toLowerCase();
      });
   }
   let wrapper = document.getElementsByClassName('wrapper')[0];
   wrapper.innerHTML = '<div class="headings"><span>Source</span><span>Destination</span><span>Departure</span><span>Arrival</span><span>Fare</span></div>';
   for (let i = 0; i < flightDataNew.length; i++) {
       let str = `<div class="data" onClick="bookFlight(this)"=>
                   <span>${flightDataNew[i].src}</span>
                   <span>${flightDataNew[i].dest}</span>
                   <span>${flightDataNew[i].dep}</span>
                   <span>${flightDataNew[i].arr}</span>
                   <span>${flightDataNew[i].price}</span>
               </div>`;
       wrapper.innerHTML += str;
   }
}
