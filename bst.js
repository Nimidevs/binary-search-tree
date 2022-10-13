class Node {
  constructor (value) {
    this.data = value
    this.left = null
    this.right = null
  }
}
class Tree {
  constructor (arr) {
    this.root = arr
  }
}
function buildTree (arr, start, end) {
  if (start > end) {
    return null
  }
  const mid = parseInt((start + end) / 2)
  const node = new Node(arr[mid])
  node.left = buildTree(arr, start, mid - 1)
  node.right = buildTree(arr, mid + 1, end)
  return node
}
function insert (root, value) {
  if (root === null) {
    root = new Node(value)
    return root
  }
  if (value < root.data) {
    root.left = insert(root.left, value)
  } else if (value > root.data) {
    root.right = insert(root.right, value)
  }
  return root
}
function deleteRec (root, value) {
  if (root === null) {
    return root
  }
  if (value < root.data) {
    root.left = deleteRec(root.left, value)
  } else if (value > root.data) {
    root.right = deleteRec(root.right, value)
  } else {
    if (root.left === null) {
      return root.right
    } else if (root.right === null) {
      return root.left
    }
    root.left = minValue(root.right)
    root.right = deleteRec(root.right, root.data)
  }
  return root
}
function minValue (root) {
  let minv = root.key
  while (root.left != null) {
    minv = root.left.key
    root = root.left
  }
  return minv
}

function find (root, value) {
  if (root === null) {
    return 'root is null'
  }
  if (root.data === value) {
    return root
  }
  if (value < root.key) {
    find(root.left, value)
  } else if (value > root.key) {
    find(root.right, value)
  }
}

function levelOrderTraversal (root) {
  if (root == null) {
    return
  }
  const addressArray = []
  const permanentArray = []
  addressArray.push(root)
  while (addressArray.length !== 0) {
    const current = addressArray.shift()
    if (current.left !== null) {
      addressArray.push(current.left)
    }
    if (current.right !== null) {
      addressArray.push(current.right)
    }
    permanentArray.push(current.data)
  }
  return permanentArray
}

function preOrderTraversal (root) {
  if (root === null) {
    return []
  }
  const preOrderArray = []
  preOrderArray.push(root.data)
  preOrderArray.push(...preOrderTraversal(root.left))
  preOrderArray.push(...preOrderTraversal(root.right))
  return preOrderArray
}

function inOrderTraversal (root) {
  if (root === null) {
    return []
  }
  const inOrderArray = []
  inOrderArray.push(...inOrderTraversal(root.left))
  inOrderArray.push(root.data)
  inOrderArray.push(...inOrderTraversal(root.right))
  return inOrderArray
}

function postOrderTraversal (root) {
  if (root === null) {
    return []
  }
  const postOrderArray = []
  postOrderArray.push(...postOrderTraversal(root.left))
  postOrderArray.push(...postOrderTraversal(root.right))
  postOrderArray.push(root.data)
  return postOrderArray
}
function height (root) {
  if (root === null) {
    return 0
  }
  return Math.max(height(root.left), height(root.right)) + 1
}
function isBalanced (root) {
  if (root === null) {
    return true
  }
  const leftH = height(root.left)
  const rightH = height(root.right)

  if (Math.abs(leftH - rightH) <= 1 && isBalanced(
    root.left) === true && isBalanced(root.right) === true) { return true }

  return false
}
function reBalance (root) {
  const newArray = inOrderTraversal(root)
  return buildTree(newArray, 0, newArray.length - 1)
}
