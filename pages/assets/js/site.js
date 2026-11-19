/**
 * 歐椰咖啡 (O-Yea Coffee) - 官方網站共用腳本 (site.js)
 * 學號：11515112
 * 支援功能：手機版導覽選單展開/收合、無障礙鍵盤操作、視窗尺寸變更監聽
 */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  if (!menuToggle || !siteNav) return;

  // 切換選單狀態函式
  const toggleMenu = (forceState) => {
    const isCurrentlyOpen = siteNav.classList.contains("is-open");
    const willOpen = typeof forceState === "boolean" ? forceState : !isCurrentlyOpen;

    if (willOpen) {
      siteNav.classList.add("is-open");
      menuToggle.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
    } else {
      siteNav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  };

  // 點擊漢堡按鈕開關選單
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // 點擊選單內部任何連結自動收合
  const navLinks = siteNav.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        toggleMenu(false);
      }
    });
  });

  // 點擊網頁外部空白處自動收合
  document.addEventListener("click", (e) => {
    if (!siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
      if (siteNav.classList.contains("is-open")) {
        toggleMenu(false);
      }
    }
  });

  // 按下鍵盤 ESC 鍵自動收合
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && siteNav.classList.contains("is-open")) {
      toggleMenu(false);
      menuToggle.focus();
    }
  });

  // 視窗尺寸改變超過 768px 自動重設狀態
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && siteNav.classList.contains("is-open")) {
      toggleMenu(false);
    }
  });
});
