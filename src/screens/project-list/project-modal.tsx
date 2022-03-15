import React from "react";
import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer width={`100%`} visible={projectModalOpen} onClose={close}>
      <Button onClick={close}>{`Close`}</Button>
    </Drawer>
  );
};
