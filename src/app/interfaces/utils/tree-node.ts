/** 数组节点接口（用于数组和树转换） */
export interface ArrNode {
  /** 当前节点key */
  id: number;
  /** 父节点key */
  parentId?: number;
  /** 其它属性的索引签名 */
  [key: string]: any;
}

/** 树节点接口 */
export interface TreeNode extends ArrNode {
  /** 子节点列表 */
  children?: TreeNode[];
  /** 是否存在子节点 */
  hasChildren?: boolean;
  /** 当前层级 */
  currentLevel?: number;
}
