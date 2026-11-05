/* Read in Daily Life Practice: notices, emails, menus and schedules with questions. */
(function () {
  'use strict';
  const items = (texts) => texts.flatMap((t) => t.questions.map((q) => Object.assign({ stem: '' }, q, { passage: t.text, passageTitle: t.kind + ': ' + t.title, group: t.id, topic: t.kind })));
  const App = {
    about: 'The updated TOEFL Reading section includes short everyday texts, such as notices, emails, menus, schedules and messages, with questions on details, purpose and inference. This app has twelve original texts of that kind with 26 questions.',
    how: ['Choose a kind of text, or All, in **Practice**.', 'Read the question first, then scan the text for the answer.', 'For inference questions, choose what must be true, not what might be.'],
    tabs: [{ id: 'practice', label: 'Practice', render(el, ctx) {
      const all = items(ctx.data.daily_texts);
      SK.quizStarter(el, { title: 'Read in daily life', topics: SK.topicsOf(all), sizes: [4, 8, 16], make: (t, n, s) => SK.takeGroups(SK.rng(s), all.filter((x) => t === 'All' || x.topic === t), n), seconds: (n) => n * 45 });
    } }],
    items,
    checks: { 'every text has valid questions': (data, assert) => { const all = items(data.daily_texts); assert.equal(all.length, 26); for (const it of all) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
