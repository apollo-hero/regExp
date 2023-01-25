// Create function to convert given string to the output below

// Input
const optionRule =
  '{1069} AND ({1070} OR {1071} OR {1072}) AND {1244} AND ({1245} OR {1339})';

const pieces = [];
let currentRule = optionRule;
const regPattern = /\([^\(\)]+\)/g;
const orDelimiter = /[ ]*OR[ ]*/;
const andDelimiter = /[ ]*AND[ ]*/;

const splitOptions = (rules) => {
  const curDelimiter = orDelimiter.test(rules)
    ? 'OR'
    : 'AND';
  const delimiter = orDelimiter.test(rules)
    ? orDelimiter
    : andDelimiter;
  pieces.push({
    [curDelimiter]: rules.split(delimiter).map((rule) => {
      const option = parseInt(rule.replace(/\D/g, ''));
      if (/^#\d+#$/.test(rule) && !!pieces[option - 1]) {
        return pieces[option - 1];
      }
      return option;
    }),
  });
};

while (regPattern.test(currentRule)) {
  currentRule = currentRule.replace(regPattern, (match) => {
    splitOptions(match.substr(1, match.length - 1));
    return `#${pieces.length}#`;
  });
}

splitOptions(currentRule);

console.log(pieces.pop());
