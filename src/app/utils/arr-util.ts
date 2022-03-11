import { ObjectUtil } from "./object-util";
import { ArrNode, TreeNode } from "../interfaces/utils/tree-arr-node";

/** 数组工具 */
export class ArrUtil {

    /**
     * @description 根据对象数组的某个属性去重
     * @param arr 目标数组
     * @param u_key 去重的属性名称
     * @returns 去重后的数组
     */
    static uniqueByProps<T extends Object, K extends keyof T>(arr: Array<T>, u_key: K): Array<T> {
        const map = new Map();
        arr.forEach(item => {
            if (!map.has(item[u_key])) {
                map.set(item[u_key], item);
            }
        })
        return [...map.values()];
    }

    /**
     * @description 根据对象数组的某个属性排序
     * @param arr 目标数组
     * @param u_key 排序的属性名称
     * @param isAsc true升序（默认），false降序
     * @returns 排序后的数组
     */
    static sortByProps<T extends Object, K extends keyof T>(arr: T[], u_key: K, isAsc = true): T[] {
        const resultArr = arr.sort((a, b) => {
            if (a[u_key] === b[u_key]) {
                return 0;
            } else if (a[u_key] > b[u_key]) {
                return isAsc ? 1 : -1;
            } else {
                return isAsc ? -1 : 1;
            }
        });
        return resultArr;
    }

    /**
     * @description 数组转成树结构
     * @param arr 目标数组
     * @returns 返回的树结构
     */
    static arrTranslateTree(arr: ArrNode[]): TreeNode[] {
        const parentList = arr.filter(dd => { // 无父节点的list
            return dd.parentId === null
                || dd.parentId === undefined
                || !arr.find(kk => kk.id === dd.parentId)
        });
        const childrenList = arr.filter(dd => !!arr.find(kk => { // 存在父节点的list
            return dd.parentId !== undefined && dd.parentId !== null && dd.parentId === kk.id;
        }));

        /**
         * @description 获取当前节点对应的树节点
         * @param currentNode 当前节点
         * @param children 存在父节点的list
         * @param level 当前节点对应层级
         * @returns 当前节点对应的树节点
         */
        const getTreeNode = (currentNode: ArrNode, children: ArrNode[], level: number): TreeNode => {
            const copyNode = ObjectUtil.deepCopy(currentNode); // 深度复制当前节点
            const treeItem: TreeNode = { // 初始化当前节点对应的树节点
                ...copyNode, hasChildren: false, children: [], currentLevel: level
            };
            children.forEach((childItem, index) => {
                const levelAddOne = level + 1; // 当前节点层级+1，函数调用
                if (currentNode.id === childItem.parentId) { // 当前节点对应的子节点
                    treeItem.hasChildren = true;
                    let temp = ObjectUtil.deepCopy(children); // 深度克隆子节点list
                    temp.splice(index, 1); // 移除当前子节点，减少递归时的循环
                    treeItem.children?.push(getTreeNode(childItem, temp, levelAddOne));
                }
            });
            return treeItem;
        }
        const treeNodeList: TreeNode[] = [];
        parentList.forEach(parentItem => { // 循环写入父节点
            treeNodeList.push(getTreeNode(parentItem, childrenList, 1));
        });

        return treeNodeList;
    }

    /**
     * @description 树转数组结构
     * @param tree 树结构
     * @returns 数组
     */
    treeTranslateArr(tree: TreeNode[]): ArrNode[] {
        let cloneTree = ObjectUtil.deepCopy(tree); // 深度复制树，不改变传入的值结构
        const resultArr: ArrNode[] = [];
        while (cloneTree.length) {
            const firstItem = cloneTree.shift() as TreeNode; // 取出第一个树节点
            const firstChildren = ObjectUtil.deepCopy(firstItem.children);
            delete firstItem.children; // 移除children属性
            delete firstItem.currentLevel; // 移除当前节点层级
            delete firstItem.hasChildren; // 移除当前节点是否存在子节点
            resultArr.push(firstItem);
            if (Array.isArray(firstChildren)) {
                cloneTree = [...cloneTree, ...firstChildren];
            }
        }
        return resultArr;
    }

}
