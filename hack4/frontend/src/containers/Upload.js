import { useMutation } from "@apollo/client";
import Uploader from "../components/Uploader";
import { UPLOAD_MUTATION } from "../graphql";

import "./Upload.css";

export default function Upload() {
  const [insertPeople] = useMutation(UPLOAD_MUTATION);

  return (
    <div id="Upload">
      <div id="PeopleUploader">
        <Uploader tag="People" mutation={insertPeople} />
      </div>
    </div>
  );
}
