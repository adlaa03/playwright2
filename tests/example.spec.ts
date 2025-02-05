import { test as base, BrowserContext, Page } from "@playwright/test";
import { PlaywrightLoginPage } from "./auth/login";
import { PlaywrightRegisterPage } from "./auth/register";
import { PlaywrightDashboardPage } from "./dashboard/dashboard";
import { PlaywrightSidebarPage } from "./dashboard/sidebar";

import { PlaywrightPembeliPage } from "./dashboard/pembeli/pembeli";
import { PlaywrightPembeliEditPage } from "./dashboard/pembeli/editpembeli";
import { PlaywrightLihatPembeliPage } from "./dashboard/pembeli/lihatpembeli";
import { PlaywrightHapusPembeliPage } from "./dashboard/pembeli/hapuspembeli";

import { PlaywrightBeliCashPage } from "./dashboard/belicash/belicash";
import { PlaywrightBeliCashEditPage } from "./dashboard/belicash/editbelicash";
import { PlaywrightHapusBeliCashPage } from "./dashboard/belicash/hapusbelicash";

import { PlaywrightBeliKreditPage } from "./dashboard/belikredit/belikredit";
import { PlaywrightBeliKreditEditPage } from "./dashboard/belikredit/editbelikredit";
import { PlaywrightLihatBeliKreditPage } from "./dashboard/belikredit/lihatbelikredit";
import { PlaywrightHapusBeliKreditPage } from "./dashboard/belikredit/hapusbelikredit";

import { PlaywrightBayarCicilanPage } from "./dashboard/bayarcicilan/bayarcicilan";

import { PlaywrightLogoutPage } from "./auth/logout";
import { register } from "module";

let context: BrowserContext;
let page: Page;

const test = base.extend({
  loginPage: async ({}, use) => {
    await use(new PlaywrightLoginPage(page));
  },
  registerPage: async ({}, use) => {
    await use(new PlaywrightRegisterPage(page));
  },
  dashboardPage: async ({}, use) => {
    await use(new PlaywrightDashboardPage(page));
  },
  sidebarPage: async ({}, use) => {
    await use(new PlaywrightSidebarPage(page));
  },
  pembeliPage: async ({}, use) => {
    await use(new PlaywrightPembeliPage(page));
  },
  editpembeliPage: async ({}, use) => {
    await use(new PlaywrightPembeliEditPage(page));
  },
  lihatpembeliPage: async ({}, use) => {
    await use(new PlaywrightLihatPembeliPage(page));
  },
  hapuspembeliPage: async ({}, use) => {
    await use(new PlaywrightHapusPembeliPage(page));
  },
  belicashPage: async ({}, use) => {
    await use(new PlaywrightBeliCashPage(page));
  },
  editbelicashPage: async ({}, use) => {
    await use(new PlaywrightBeliCashEditPage(page));
  },
  hapusbelicashPage: async ({}, use) => {
    await use(new PlaywrightHapusBeliCashPage(page));
  },
  belikreditPage: async ({}, use) => {
    await use(new PlaywrightBeliKreditPage(page));
  },
  editbelikreditPage: async ({}, use) => {
    await use(new PlaywrightBeliKreditEditPage(page));
  },
  lihatbelikreditPage: async ({}, use) => {
    await use(new PlaywrightLihatBeliKreditPage(page));
  },
  hapusbelikreditPage: async ({}, use) => {
    await use(new PlaywrightHapusBeliKreditPage(page));
  },
  bayarcicilanPage: async ({}, use) => {
    await use(new PlaywrightBayarCicilanPage(page));
  },
  logoutPage: async ({}, use) => {
    await use(new PlaywrightLogoutPage(page));
  },
});

test.describe("motomarker", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new PlaywrightLoginPage(page);
    const registerPage = new PlaywrightRegisterPage(page);

    await page.goto("/login");
    await registerPage.toRegisPage();
    await loginPage.goToLoginPage();
    await loginPage.inputlogin("adilla@gmail.com", "adilla0306");
  });

  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.cekTitle();
  });
  // test.beforeEach(async ({ dashboardPage }) => {
  //   // await loginPage.page.goto("/login");
  //   // console.log("Register");
  //   // await registerPage.toRegisPage();
  //   // await loginPage.goToLoginPage();
  //   // await loginPage.inputlogin("adilla@gmail.com", "adilla0306");

  //   await dashboardPage.cekTitle();
  // });

  test.afterEach(async ({ page }) => {
    await page.reload();
  });

  test.afterAll(async ({}) => {
    const logoutPage = new PlaywrightLogoutPage(page);
    await logoutPage.logout();
    await context.close();
  });

  test("submit pembeli form", async ({ sidebarPage, pembeliPage }) => {
    await sidebarPage.cekPembeli();
    await pembeliPage.inputpembeli("Adilla Ibrahim");
    await pembeliPage.submitFormPembeli();
    await pembeliPage.MemastikanPembeliMasuk();
  });

  test("submit transaksi cash form", async ({ sidebarPage, belicashPage }) => {
    await sidebarPage.cekBeliCash();
    await belicashPage.inputbelicash(
      "NMAX",
      "25000000",
      "Adilla Ibrahim",
      "2025-01-20"
    );
    await belicashPage.submitFormBeliCash();
    await belicashPage.MemastikanBeliCashMasuk();
  });

  test("submit transaksi kredit form", async ({
    sidebarPage,
    belikreditPage,
  }) => {
    await sidebarPage.cekBeliKredit();
    await belikreditPage.inputbelikredit(
      "Adilla Ibrahim",
      "Beat",
      "2025-01-01",
      "P002",
      "Ya",
      "Tidak",
      "Tidak"
    );
    await belikreditPage.submitFormBeliKredit();
    await belikreditPage.MemastikanBeliKreditMasuk();
  });

  test("submit pembayaran cicilan form", async ({
    sidebarPage,
    bayarcicilanPage,
  }) => {
    await sidebarPage.cekBayarCicilan();
    await bayarcicilanPage.inputbayarcicilan("4", "2025-01-01");
    await bayarcicilanPage.submitFormBayarCicilan();
    await bayarcicilanPage.MemastikanBayarCicilanMasuk();
  });

  test("edit pembeli form", async ({ editpembeliPage, lihatpembeliPage }) => {
    await editpembeliPage.editPembeli("Adilla Ibrahim");
    await editpembeliPage.submitFormEditPembeli();
    await editpembeliPage.MemastikanEditPembeliMasuk();
    await lihatpembeliPage.goToLihatPembeli();
  });

  test("edit beli cash form", async ({ editbelicashPage }) => {
    await editbelicashPage.editbelicash("Beat", "Adilla Ibrahim");
    await editbelicashPage.submitFormEditBeliCash();
    await editbelicashPage.MemastikanEditBeliCashMasuk();
  });

  test("edit beli kredit form", async ({
    editbelikreditPage,
    lihatbelikreditPage,
  }) => {
    await editbelikreditPage.editbelikredit("P002", "Tidak");
    await editbelikreditPage.submitFormEditBeliKredit();
    await editbelikreditPage.MemastikanEditBeliKreditMasuk();
    await lihatbelikreditPage.goToLihatBeliKredit();
  });

  test("hapus pembeli", async ({ sidebarPage, hapuspembeliPage }) => {
    await sidebarPage.cekPembeli();
    await hapuspembeliPage.hapusPembeli();
  });

  test("hapus beli cash", async ({ sidebarPage, hapusbelicashPage }) => {
    await sidebarPage.cekBeliCash();
    await hapusbelicashPage.hapusBeliCash();
  });

  test("hapus beli kredit", async ({ sidebarPage, hapusbelikreditPage }) => {
    await sidebarPage.cekBeliKredit();
    await hapusbelikreditPage.hapusBeliKredit();
  });
});
