import { CryptoProvider } from "../../providers/CryptoProvider";
import { UiProvider } from "../../providers/UiProvider";

export default function MockContext({ children }) {
  return (
    <CryptoProvider>
      <UiProvider>{children}</UiProvider>
    </CryptoProvider>
  );
}
