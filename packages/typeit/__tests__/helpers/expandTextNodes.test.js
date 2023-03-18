import expandTextNodes from "../../src/helpers/expandTextNodes";
import { DEFAULT_OPTIONS } from "../../src/constants";

const getTextNodes = (element) => {
  return [...element.childNodes].filter((n) => n.nodeType === 3);
};

const defaultExpandTextNodes = (element) => {
  return expandTextNodes(element, DEFAULT_OPTIONS.stringSpliterator);
};

describe("simple content", () => {
  it("expands text nodes", () => {
    setHTML(`<span>hello</span>`);

    const element = document.querySelector("span");
    defaultExpandTextNodes(element);

    expect(element.childNodes).toHaveLength(5);
    expect(element.innerHTML).toEqual("hello");
  });
});

describe("simple HTML", () => {
  it("expands text nodes", () => {
    setHTML(`<span>hello, <strong>pal!</strong></span>`);

    const element = document.querySelector("span");
    defaultExpandTextNodes(element);

    expect(getTextNodes(element)).toHaveLength(7);
    expect(getTextNodes(element.querySelector("strong"))).toHaveLength(4);
    expect(element.innerHTML).toEqual("hello, <strong>pal!</strong>");
  });
});

describe("nested HTML", () => {
  it("expands text nodes", () => {
    setHTML(`<span>hello, <strong>there, <em>pal!</em></strong></span>`);

    const element = document.querySelector("span");
    defaultExpandTextNodes(element);

    expect(getTextNodes(element)).toHaveLength(7);
    expect(getTextNodes(element.querySelector("strong"))).toHaveLength(7);
    expect(getTextNodes(element.querySelector("strong em"))).toHaveLength(4);
    expect(element.innerHTML).toEqual(
      "hello, <strong>there, <em>pal!</em></strong>"
    );
  });
});

describe("emojis", () => {
  it("expands text nodes", () => {
    setHTML(`<span>good job 👍.</span>`);

    const element = document.querySelector("span");
    defaultExpandTextNodes(element);

    expect(getTextNodes(element)).toHaveLength(11);
    expect(element.innerHTML).toEqual("good job 👍.");
  });
});
