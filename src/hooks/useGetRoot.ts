import { TaroNode, document } from "@tarojs/runtime";
import { useEffect, useState } from "react";

// let cachedRoot: null | TaroNode = null;
export function getRoot(nodes?: TaroNode[]) {
    if(!nodes) nodes = document.body.childNodes
    // if(cachedRoot) return cachedRoot
    if (!nodes.length) return null;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node?.nodeName === 'root') {
            console.log('found');
            // cachedRoot = node
            return node;
        }

        if (node?.childNodes.length) {
            const foundNode = getRoot(node.childNodes);
            if (foundNode) {
                return foundNode;
            }
        }
        
        console.log('node', node);
    }

    return null;
}
export function useRoot() {
    const [root, setRoot] = useState<null | TaroNode>(null)
    useEffect(() => {
        const tmpRoot = getRoot()
        tmpRoot && setRoot(tmpRoot)
    },[])
    return root
}