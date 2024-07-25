import { RootState } from "@/store";

export const selectLoading = (state: RootState) => state.ui.loading;
