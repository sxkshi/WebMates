

let flightData = [
   {
      'fno': '6A6490',
      'src': 'Titan',
      'dest': 'Europa',
      'dep': '10:20',
      'arr': '12:00',
      'price': '3050'
   },
   {
       'fno': '6A6590',
       'src': 'Titan',
       'dest': 'Ceres',
       'dep': '14:00',
       'arr': '15:40',
       'price': '3999'
    },
    {
       'fno': '6A6880',
       'src': 'Europa',
       'dest': 'Ceres',
       'dep': '16:10',
       'arr': '17:50',
       'price': '2199'
    },
    {
       'fno': '6A6899',
       'src': 'Europa',
       'dest': 'Olympus',
       'dep': '14:35',
       'arr': '16:10',
       'price': '5520'
    },
    {
       'fno': '6A6884',
       'src': 'Olympus',
       'dest': 'Titan',
       'dep': '17:20',
       'arr': '20:00',
       'price': '8999'
    },
    {
       'fno': '6A6392',
       'src': 'Olympus',
       'dest': 'Martian',
       'dep': '07:15',
       'arr': '08:555',
       'price': '2000'
    },
    {
       'fno': '6A6590',
       'src': 'Ceres',
       'dest': 'Europa',
       'dep': '21:00',
       'arr': '23:50',
       'price': '4500'
    },
    {
       'fno': '6A6690',
       'src': 'Ceres',
       'dest': 'Valles',
       'dep': '05:25',
       'arr': '08:00',
       'price': '3590'
    },

];


document.addEventListener('DOMContentLoaded', function() {
   let wrapper = document.getElementsByClassName('wrapper')[0];
   for (let i = 0; i < flightData.length; i++) {
       let str = `<div class="data" onClick="bookFlight(this)"=>
                   <span>${flightData[i].fno}</span>
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

let fno,src, dest, dep, arr, price, adult, children, travelClass, date, addons;

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
  travelClass = document.getElementById('flightclass').value;
  date = document.getElementById('date').value;
  addons = "";
  if (travelClass === '') {
     alert('Please choose a travel class.');
     return;
  }
  if (adult === '') {
     alert('Please enter number of adults.');
     return;
  }
  if (children === '') {
   alert('Please enter number of children.');
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
  price = price + (addonCount * 599);
  if (travelClass === 'Business Class') price += 800;
  else if (travelClass === 'First Class') price += 1500;
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
     <div> £ ${price}</div>`;
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
