import ignore from "./ignore";
import { ignoreSwitchFiles } from '../elements/ignore/switch';
import { ignoreTextfieldFiles } from '../elements/ignore/textfield'

export default function ignoreWrapper() {
    return ignore({
        files: [
          ...ignoreSwitchFiles,
          ...ignoreTextfieldFiles,
        ].map((file) => require.resolve(file)),
      })
}