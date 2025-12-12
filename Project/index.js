
document.querySelectorAll('.titles .component').forEach(function(component) {
    component.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        document.querySelectorAll('.titles .component').forEach(function(tab) {
            tab.classList.remove('active');
            tab.querySelector('.text').classList.remove('active');
        });
        document.querySelectorAll('.quotes > div').forEach(function(quote) {
            quote.classList.remove('active');
        });
    
        
        this.classList.add('active');
        this.querySelector('.text').classList.add('active'); 
        document.querySelector(`.${target}`).classList.add('active'); 
    });
});
ymaps.ready(function(){
    // Указывается идентификатор HTML-элемента.
    var moscow_map = new ymaps.Map("first_map", {
        center: [55.76, 37.64],
        zoom: 10
    });
    // Ссылка на элемент.
    var piter_map = new ymaps.Map(document.getElementsByTagName('p')[2], {
        center: [59.94, 30.32],
        zoom: 9
    });
});

function scrollToContacts() {
  const element = document.getElementById('contactstarget');
  element.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start'     
  });
};
function scrollUp() {
    window.scrollTo({top: 0, behavior: 'smooth'})
};
function scrollToMap() {
  const element = document.getElementById('map');
  element.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center'     
  });
}
function scrollToWatermelons() {
  const element = document.getElementById('watermelons');
  element.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start'     
  });
}