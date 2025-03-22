import * as _ from 'lodash';
import { ArrNode, TreeNode } from '../interfaces/utils/tree-arr-node';

/** 数组工具 */
export class ArrayUtil {
  /**
   * @description 根据对象数组的某个属性去重
   * @param arr 目标数组
   * @param u_key 去重的属性名称
   * @returns 去重后的数组
   */
  static uniqueByProps<T extends Object, K extends keyof T>(
    arr: Array<T>,
    u_key: K
  ): Array<T> {
    const map = new Map();
    arr.forEach((item) => {
      if (!map.has(item[u_key])) {
        map.set(item[u_key], item);
      }
    });
    return [...map.values()];
  }

  /**
   * @description 数组转成树结构
   * @param arr 目标数组
   * @returns 返回的树结构
   */
  static arrayToTree(arr: ArrNode[]): TreeNode[] {
    const idsSet = new Set(arr.map((dd) => dd.id));
    const parentList = arr.filter((kk) => !idsSet.has(kk.parentId!));
    const childrenList = arr.filter((kk) => idsSet.has(kk.parentId!));

    /**
     * @description 获取当前节点对应的树节点
     * @param currentNode 当前节点
     * @param children 存在父节点的list
     * @param level 当前节点对应层级
     * @returns 当前节点对应的树节点
     */
    const getTreeNode = (
      currentNode: ArrNode,
      children: ArrNode[],
      level: number
    ): TreeNode => {
      const copyNode = _.cloneDeep(currentNode); // 深度复制当前节点
      // 初始化当前节点对应的树节点
      const treeItem: TreeNode = {
        ...copyNode,
        hasChildren: false,
        children: [],
        level,
      };
      children.forEach((childItem, index) => {
        if (currentNode.id === childItem.parentId) {
          // 当前节点对应的子节点
          treeItem.hasChildren = true;
          let temp = _.cloneDeep(children); // 深度克隆子节点list
          temp.splice(index, 1); // 移除当前子节点，减少递归时的循环
          treeItem.children?.push(getTreeNode(childItem, temp, level + 1));
        }
      });
      return treeItem;
    };
    return parentList.map((dd) => getTreeNode(dd, childrenList, 1));
  }

  /**
   * @description 树转数组结构
   * @param tree 树结构
   * @returns 数组
   */
  static treeToArray(tree: TreeNode[]): ArrNode[] {
    let cloneTree = _.cloneDeep(tree); // 深度复制树，不改变传入的值结构
    const resultArr: ArrNode[] = [];
    while (cloneTree.length) {
      const firstItem = cloneTree.shift() as TreeNode; // 取出第一个树节点
      const firstChildren = _.cloneDeep(firstItem.children);
      delete firstItem.children; // 移除children属性
      delete firstItem.level; // 移除当前节点层级
      delete firstItem.hasChildren; // 移除当前节点是否存在子节点
      resultArr.push(firstItem);
      if (Array.isArray(firstChildren)) {
        cloneTree = [...cloneTree, ...firstChildren];
      }
    }
    return resultArr;
  }
}
