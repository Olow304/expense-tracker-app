import { getProfileRouter } from './getProfile';
import { updateProfileRouter } from './updateProfile';
import { addCategoryRouter } from './addCategory';
import { getExpenseRouter } from './getExpense';
// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { registerRouter } from "./register";
import { loginRouter } from "./login";
import { forgotpasswordRouter } from "./forgotPassword";
import { resetpasswordRouter } from "./resetPassword";
import { addExpenseRouter } from "./addExpense";
import { getCategoriesRouter } from './getAllCategories';
import { deleteCategoryRouter } from './deleteCategory';
import { deleteExpneseRouter } from './deleteExpense';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", registerRouter)
  .merge("user.", loginRouter)
  .merge("user.", forgotpasswordRouter)
  .merge("user.", resetpasswordRouter)
  .merge("user.", addExpenseRouter)
  .merge("user.", getExpenseRouter)
  .merge("user.", getCategoriesRouter)
  .merge("user.", addCategoryRouter)
  .merge("user.", deleteCategoryRouter)
  .merge("user.", deleteExpneseRouter)
  .merge("user.", updateProfileRouter)
  .merge("user.", getProfileRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
