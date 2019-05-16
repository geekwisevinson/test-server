function showResponse(p_value) {
    let el = document.querySelector('#show-response');
    if (!el){
        el = document.createElement('div');
        el.setAttribute('id', 'show-response');
    }
    el.innerHTML = p_value;
}