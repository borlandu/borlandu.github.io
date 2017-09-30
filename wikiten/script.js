let searchUrl = 'https://ru.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://ru.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
let counter = {
  current: 0,
  max: 10
};
let flag_blockSearch = false;

$('.wikiForm').submit(() => {
  let query = $('.wikiInput').val();
  query = query[random(query.length)];
  $('.wikiInput').prop('disabled', true);
  $('.wikiInput').val('').blur();
  if(!flag_blockSearch){
    wikiSearch(query);
    for(let i = 0; i < $('.ol li').length; i++)
      $(`.ol #l${i} a`).attr({ 'href': '#', 'title': '' }).text('');
  }
  return false;
});

//Делать репос если такая статья уже есть
//почистить код, да да это можно полюбасу
//Если страница содержит редирект, то не нужно её в список

let wikiSearch = (query) => {
  if(query === '') return console.log('Пустой запрос');

  if(counter.current >= counter.max){
    flag_blockSearch = false;
    $('.wikiInput').prop('disabled', false);
    return counter.current = 0;
  }



  $.ajax({
    url: searchUrl + encodeURIComponent(query),
    dataType: 'jsonp',
    success: d => {
      console.log(d);

      let len = d[1].length;
      let index = random(len);
      let title = d[1][index];

      if(len === 0){
        console.log('query: '+query);
        if(query.split('').includes('_'))
          query = removeElemFromArray(query, '_');

        let newquery = query[random(query.length)] || Math.random().toString(36).substr(-1);

        counter.current--;
        wikiSearch(newquery);
        console.log(`По запросу "${query}" ничего не найдено. Новый запрос - "${newquery}"`);
        return;
      }

      let href = d[3][index];
      $(`.ol #l${counter.current - 1} a`).attr({ 'href': href, 'title': d[2][index] }).text(title);
      //console.log('[wikiSearch]: ', title);
      //console.log('[wikiSearch]: ind: ', index);

      title = title.replace(/\s+/g, '_');
      //console.log(title);
      wikiContent(title);
    }
  });
  counter.current++;
};
//
let wikiContent = (query) => {
  $.ajax({
    url: contentUrl + encodeURIComponent(query),
    dataType: 'jsonp',
    success: d => {
      //console.log(d.query.pages);

      let page = d.query.pages;
      let pid = Object.keys(d.query.pages)[0];
      let content = page[pid].revisions[0]['*'];

      //Namestovo -- для проверки на редирект
      if(content.includes('#REDIRECT')) return wikiSearch(content.slice(12,-2));
      if(content.includes('#перенаправление')) return wikiSearch(content.slice(19,-2));

      let wordRegex = /\b\w{4,}\b/g;// Слова длиннее 4 букв
      let words = content.match(wordRegex);
      let word = words[random(words.length)] || Math.random().toString(36).substr(-1);
      //console.log(words);
      //console.log('[wikiContent]: ', word);
      wikiSearch(word);
    }
  });
};



let random = x => {
  return Math.floor(x * Math.random());
};
let removeElemFromArray = (array, value) => {
  array = Array.from(array);
  for(let i = 0; i < array.length; i++)
    if(array[i] === value)
      array.splice(i, 1);
  return array;
};
