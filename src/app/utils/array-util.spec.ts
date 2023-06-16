import { ArrayUtil } from "./array-util";

describe('ArrayUtil Test', () => {

  const arr = [
    { id: 'id1' },
    { id: 'id3' },
    { id: 'id2', parentId: 'id1' },
    { id: 'id4', parentId: 'id3' },
    { id: 'id5', parentId: 'id2' },
  ];
  const trees = [
    {
      id: 'id1',
      level: 1,
      hasChildren: true,
      children: [
        {
          id: 'id2',
          level: 2,
          hasChildren: true,
          parentId: 'id1',
          children: [
            { id: 'id5', parentId: 'id2', level: 3, hasChildren: false, children: [] }
          ]
        }
      ]
    },
    {
      id: 'id3',
      level: 1,
      hasChildren: true,
      children: [
        { id: 'id4', parentId: 'id3', level: 2, hasChildren: false, children: [] }
      ]
    }
  ];

  it('uniqueByProps static function', () => {
    const arr = [
      { a: '1', b: 0, c: false },
      { a: '1', b: 1, c: true },
      { a: '2', b: 1, c: true },
    ];
    const result = [{ a: '1', b: 0, c: false }, { a: '2', b: 1, c: true },];
    expect(ArrayUtil.uniqueByProps(arr, 'a')).toEqual(result);
  });

  it('arrayToTree static function', () => {
    expect(ArrayUtil.arrayToTree([])).toEqual([]);
    expect(ArrayUtil.arrayToTree(arr)).toEqual(trees);
  });

  it('treeToArray static function', () => {
    expect(ArrayUtil.treeToArray([])).toEqual([]);
    expect(ArrayUtil.treeToArray(trees)).toEqual(arr);
  });
});
