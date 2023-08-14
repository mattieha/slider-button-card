import ignore from "./ignore";
import { ignoreSelectFiles } from '../elements/ignore/select';
import { ignoreSwitchFiles } from '../elements/ignore/switch';
import { ignoreTextfieldFiles } from '../elements/ignore/textfield'

export default function ignoreWrapper() {
    return ignore({
        files: [
          ...ignoreSelectFiles,
          ...ignoreSwitchFiles,
          ...ignoreTextfieldFiles,
        ].map((file) => require.resolve(file)),
      })
}