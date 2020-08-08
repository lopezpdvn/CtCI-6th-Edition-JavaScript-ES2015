'use strict';

/**
 * The two given nodes could be anywhere within the tree and travelling upwards
 * we will eventually find the point at which the paths to the nodes diverge. As
 * we don't want to use extra space (so a map of nodes isn't an option) we first
 * need to figure out the different in depth of the two nodes. We then travel up
 * from the lower node, if there is one, so that we start at the same depth down
 * the path of each node. After we're at equal depths we just follow parent
 * pointers until we find a node that is common to both paths, that is the first
 * common ancestor.
 *
 * N = |tree|
 * Time: O(lg N) - assumes balanced tree, worst case O(N)
 * Additional space: O(1)
 */
export function findFirstCommonAnscestor(node1, node2) {
  if (!node1 || !node2) {
    throw new Error('node1 and node2 must both be valid nodes');
  }

  let h1 = height(node1),
    h2 = height(node2);
  node1 = moveUp(node1, h1 - h2);
  node2 = moveUp(node2, h2 - h1);
  while (node1 !== node2) {
    node1 = node1.parent;
    node2 = node2.parent;
  }

  return node1.val;
}

function height(node) {
  let count = 0;
  while (node) {
    node = node.parent;
    ++count;
  }
  return count;
}

function moveUp(node, count) {
  for (let i = count; i > 0; --i) {
    node = node.parent;
  }
  return node;
}

// suppose types match
export const f = (root, p, q) => {
  if (!p || !q)
    throw new Error('node1 and node2 must both be valid nodes');

  if(!isAncestor(root, p) || !isAncestor(root, q))
    return null; // null tree is LCA of all trees

  return _g(root, p, q);
};

const _g = function g(root, p, q) {
  if(!root || root === p || root === q)
    return root;

  const pIsLeftDesc = isAncestor(root.left, p),
        qIsLeftDesc = isAncestor(root.left, q)
  if(pIsLeftDesc && qIsLeftDesc)
    return g(root.left, p, q);
  else if(!pIsLeftDesc && !qIsLeftDesc)
    return g(root.right, p, q);
  return root;
};

const isAncestor = function* (u, v) {
  if(!u && !v) return true;
  if(!u || !v) return false;
  return u === v || isAncestor(u.left, v)
                 || isAncestor(u.right, v);
};
