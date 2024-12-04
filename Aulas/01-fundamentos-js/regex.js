const emailBlocks = {
  TEXT: { start: "<!--TEXT_START-->", end: "<!--TEXT_END-->" },
  BUTTON: { start: "<!--BUTTON_START-->", end: "<!--BUTTON_END-->" },
  HTML: { start: "<!--HTML_START-->", end: "<!--HTML_END-->" },
  IMG: { start: "<!--IMG_START-->", end: "<!--IMG_END-->" },
};

const typeSetter = (tag) => {
  if (tag.includes('TEXT')) return 'text'
  if (tag.includes('BUTTON')) return 'button'
  if (tag.includes('HTML')) return 'html'
  if (tag.includes('IMG')) return 'img'
  return ''
}

const createBlock = (type, content) => {
  console.log('block', JSON.stringify({ type, content }))
}

const emailBlocksRegex = new RegExp(
  `(?<start>${emailBlocks.TEXT.start}|${emailBlocks.BUTTON.start}|${emailBlocks.HTML.start}|${emailBlocks.IMG.start})(?<content>.*?)(?<end>${emailBlocks.TEXT.end}|${emailBlocks.BUTTON.end}|${emailBlocks.HTML.end}|${emailBlocks.IMG.end})`,
  "g"
);

const stringTest =
  "<!--TEXT_START-->text text text text text<!--TEXT_END-->asdasdasdasd<!--BUTTON_START-->button button button <!--BUTTON_END-->asdasdasdasd<!--HTML_START-->htm html html<!--HTML_END-->asdasdasd<!--IMG_START-->img img img<!--IMG_END-->";

if (stringTest) {
  const matches = Array.from(stringTest.matchAll(emailBlocksRegex))

  if (matches) {
    matches.forEach((match) => {
      const groups = match?.groups
      if (groups) createBlock(typeSetter(groups.start), groups.content)
    })
  }
}
