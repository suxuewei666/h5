import { computed, nextTick, reactive, ref, watch } from "vue";
import type { Ref } from "vue";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
dayjs.locale("zh-cn");

export const NOOP = () => {};

/**
 * 验证码倒计时
 * @param countDown 倒计时时长
 * @param countDownText 倒计时时文字
 * @param waitText 等待时文字
 */
export function useVerificationCode(
  countDown = 60,
  countDownText = "s后再次发送",
  waitText = "获取验证码"
) {
  let timer = 0;
  const countDownRef = ref(countDown);

  const codeInfo = reactive({
    text: computed(() => {
      if (!codeInfo.isOK) {
        return `${countDownRef.value}${countDownText}`;
      } else {
        return waitText;
      }
    }),
    isOK: true
  });

  const stopWatch = watch(
    () => codeInfo.isOK,
    (nv) => {
      if (!nv) {
        timer = window.setInterval(() => {
          countDownRef.value--;
          if (countDownRef.value === 0) {
            clearInterval(timer);
            codeInfo.isOK = true;
            countDownRef.value = countDown;
          }
        }, 1000);
      }
    }
  );

  function destroy() {
    clearInterval(timer);
    stopWatch();
  }

  return { codeInfo, destroy };
}

/**
 * sleep
 * @param interval 间隔
 */
export async function sleep(interval: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, interval);
  });
}

/**
 * 复制
 * @param text 要复制的文案
 */
export function copy(text: string) {
  try {
    const transfer = document.createElement("input");
    document.body.appendChild(transfer);
    transfer.value = text;
    transfer.focus();
    transfer.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
    }
    transfer.blur();
    document.body.removeChild(transfer);
    return Promise.resolve("复制成功！");
  } catch (error: any) {
    console.error(error);
    return Promise.reject("该浏览器暂不支持，请手动复制");
  }
}

/* istanbul ignore next */
const trimArr = function (s: string) {
  return (s || "").split(" ").filter((item) => !!item.trim());
};

/* istanbul ignore next */
export function addClass(el?: HTMLElement | Element, cls?: string): void {
  if (!el) return;
  let className = el.getAttribute("class") || "";
  const curClass = trimArr(className);
  const classes = (cls || "")
    .split(" ")
    .filter((item) => !curClass.includes(item) && !!item.trim());

  if (el.classList) {
    el.classList.add(...classes);
  } else {
    className += ` ${classes.join(" ")}`;
    el.setAttribute("class", className);
  }
}

/* istanbul ignore next */
export function removeClass(el?: HTMLElement | Element, cls?: string): void {
  if (!el || !cls) return;
  const classes = trimArr(cls);
  let curClass = el.getAttribute("class") || "";

  if (el.classList) {
    el.classList.remove(...classes);
    return;
  }
  classes.forEach((item) => {
    curClass = curClass.replace(` ${item} `, " ");
  });
  const className = trimArr(curClass).join(" ");
  el.setAttribute("class", className);
}

/**
 * 枚举转换为key:value数组，这玩意儿不支持value为空字符串的枚举
 * @param e 枚举
 */
export function eachEnum(e: object) {
  const arry = Object.entries(e);
  arry.splice(arry.length / 2);
  return arry;
}

/**
 * 切换展开收起动画
 * @param dom 要切换dom的Ref
 * @param minHeight 最低高度的css
 */
export function useToggleTransition(
  dom: Ref<HTMLElement | undefined>,
  minHeight: Ref<string>
) {
  const toggle = ref(false);
  const maxHeight = ref(0);
  nextTick(() => {
    if (dom.value) {
      maxHeight.value = dom.value.getBoundingClientRect().height;
      dom.value.style.overflow = "hidden";
      dom.value.style.transition = "all 0.3s";
      dom.value.style.height = minHeight.value;
    }
  });

  watch(toggle, () => {
    if (dom.value) {
      if (toggle.value) {
        dom.value.style.height = maxHeight.value + "px";
      } else {
        dom.value.style.height = minHeight.value;
      }
    }
  });

  const resetHeight = () => {
    nextTick(() => {
      dom.value!.style.height = "auto";
      maxHeight.value = dom.value?.getBoundingClientRect().height || 0;
      dom.value!.style.height = maxHeight.value + "px";
      toggle.value = true;
    });
  };

  const initHeight = () => {
    nextTick(() => {
      dom.value!.style.height = "auto";
      maxHeight.value = dom.value?.getBoundingClientRect().height || 0;
      dom.value!.style.height = minHeight.value;
    });
  };

  return {
    toggle,
    resetHeight,
    initHeight
  };
}

/**
 * (异步)遍历树并执行某些操作，在func返回true时返回当前节点
 * @param tree treeList
 * @param childNodes Node key Array
 * @param func 遍历时执行的函数（可使用异步函数）,返回false时进行下一次递归
 */
export async function treeTraversal<T>(
  tree: T[],
  childNodes: string[],
  func: (item: T) => unknown
) {
  const stack = tree.slice();
  let tmpNode: T;

  while (stack.length > 0) {
    tmpNode = stack.pop()!;
    if (!(await func(tmpNode))) {
      for (const childNode of childNodes) {
        if (
          (tmpNode as any)[childNode] &&
          (tmpNode as any)[childNode].length > 0
        ) {
          stack.push(...(tmpNode as any)[childNode]);
        }
      }
    } else {
      return tmpNode;
    }
  }
}

/**
 * (同步)遍历树并执行某些操作，在func返回true时返回当前节点
 * @param tree treeList
 * @param childNodes Node key Array
 * @param func 遍历时执行的同步函数,返回false时进行下一次递归
 */
export function syncTreeTraversal<T>(
  tree: T[],
  childNodes: string[],
  func: (item: T) => unknown
) {
  const stack = tree.slice();
  let tmpNode: T;

  while (stack.length > 0) {
    tmpNode = stack.shift()!;
    if (!func(tmpNode)) {
      for (const childNode of childNodes) {
        if (
          (tmpNode as any)[childNode] &&
          (tmpNode as any)[childNode].length > 0
        ) {
          stack.push(...(tmpNode as any)[childNode]);
        }
      }
    } else {
      return tmpNode;
    }
  }
}

/**
 * 深度优先遍历
 * @param tree treeList
 * @param childNodes Node key Array
 * @param func 遍历时执行的同步函数
 */
export function DepthTraversalOfTree<T>(
  tree: T[],
  childNodes: string[],
  func: (item: T) => unknown
) {
  for (const tmpNode of tree) {
    for (const childNode of childNodes) {
      if (
        (tmpNode as any)[childNode] &&
        (tmpNode as any)[childNode].length > 0
      ) {
        DepthTraversalOfTree((tmpNode as any)[childNode], childNodes, func);
      }
    }
    func(tmpNode);
  }
}

/**
 * (同步)遍历树并执行某些操作，并返回该树
 * @param tree treeList
 * @param childNodes Node key Array
 * @param func 遍历时执行的同步函数,返回false时进行下一次递归
 */
export function mapTree<T>(
  tree: T[],
  childNodes: string[],
  func: (
    /** 当前遍历的元素 */
    item: T,
    /** 当前遍历的级别 */
    level: number,
    _id?: string
  ) => unknown
) {
  const action = (_tree: T[], _level: number): T[] => {
    const temp: T[] = [];
    for (const treeNode of _tree) {
      func(treeNode, _level);
      for (const childNode of childNodes) {
        if (
          (treeNode as any)[childNode] &&
          (treeNode as any)[childNode].length > 0
        ) {
          temp.push(...(treeNode as any)[childNode]);
        }
      }
    }
    if (temp.length > 0) {
      return action(temp, ++_level);
    }
    return tree;
  };
  return action(tree, 0);
}
