/**
 * @jest-environment jsdom
 */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
// eslint-disable-next-line no-unused-vars
const script = require('../src/script');

describe(' Verifica a requisicao search', () => {
  const returnAnime = {
    url: 'https://myanimelist.net/anime/20/Naruto',
    image_url: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6',
    title: 'Naruto',
    synopsis: 'Moments prior to Naruto Uzumaki\'s birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi\'...',
    episodes: 220,
    score: 7.94,
    start_date: '2002-10-03T00:00:00+00:00',
    rated: 'PG-13',
  };
  jest.spyOn(script, 'getSearchAnimeOrManga').mockResolvedValue(returnAnime);
  afterEach(script.getSearchAnimeOrManga.mockReset);

  test('verifica se a requisao retorna é o Naruto', async () => {
    const animeOrManga = await script.getSearchAnimeOrManga();
    expect(animeOrManga.url).toEqual('https://myanimelist.net/anime/20/Naruto');
    expect(animeOrManga.image_url).toEqual('https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6');
    expect(animeOrManga.title).toEqual('Naruto');
    expect(animeOrManga.synopsis).toEqual('Moments prior to Naruto Uzumaki\'s birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi\'...');
    expect(animeOrManga.episodes).toEqual(220);
    expect(animeOrManga.score).toEqual(7.94);
    expect(animeOrManga.rated).toEqual('PG-13');
  });
});

describe(' Verifica a requisicao topAnimes', () => {
  const returnTop = {
    rank: 1,
    title: 'Mo Dao Zu Shi: Wanjie Pian',
    image_url: 'https://cdn.myanimelist.net/images/anime/1634/116782.jpg?s=f3e813705fd0d84678835c9f3d36f3dd',
    type: 'ONA',
    start_date: 'Aug 2021',
    score: 8.6,
  };
    jest.spyOn(script, 'getAnimeOrMangaTop').mockResolvedValue(returnTop);
    afterEach(script.getAnimeOrMangaTop.mockReset);

  test('verifica se a requisao retorna é o Naruto', async () => {
    const animeOrManga = await script.getAnimeOrMangaTop();
    expect(animeOrManga.rank).toEqual(1);
    expect(animeOrManga.title).toEqual('Mo Dao Zu Shi: Wanjie Pian');
    expect(animeOrManga.image_url).toEqual('https://cdn.myanimelist.net/images/anime/1634/116782.jpg?s=f3e813705fd0d84678835c9f3d36f3dd');
    expect(animeOrManga.type).toEqual('ONA');
    expect(animeOrManga.start_date).toEqual('Aug 2021');
    expect(animeOrManga.score).toEqual(8.6);
  });
});