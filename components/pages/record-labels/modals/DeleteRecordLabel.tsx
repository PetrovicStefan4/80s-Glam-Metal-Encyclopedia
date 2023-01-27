import React from "react";
import IRecordLabel from "../../../../@types/record-label";
import Button from "../../../common/Button";
import ModalHeading from "../../../modal/ModalHeading";

interface Props {
  recordLabel: IRecordLabel | undefined;
  onSubmit: () => void;
  onDismiss: () => void;
}

const DeleteRecordBand = (props: Props) => {
  const { recordLabel, onSubmit, onDismiss } = props;

  return (
    <div className="bg-gray-100 p-10 rounded">
      <div className="container">
        <ModalHeading title={"Delete Band"} action={"delete"} />
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <p className="mb-5">
              <span>Are you sure that you want to delete record label </span>
              <strong>{recordLabel?.name}</strong>
              <span> ?</span>
            </p>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Button
              onClick={onDismiss}
              type={undefined}
              text="Cancel"
              variant={"secondary"}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Button
              onClick={onSubmit}
              type={undefined}
              text="Delete"
              variant={"primary"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRecordBand;
