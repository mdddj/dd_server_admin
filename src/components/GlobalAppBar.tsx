import React from "react";
import { Avatar, Dropdown, MenuProps } from "antd";
import { AppInitialStateModel } from "@/app";
import { SettingOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: 1,
    label: "个人设置"
  }
];
const GlobalAppBar: React.FC<{ initState: AppInitialStateModel }> = ({ initState }) => {
  return <div style={{
    display: "flex",
    alignItems: "center",
    width: "100%"
  }}>
    <div style={{ flexGrow: 1 }}>
      <Avatar style={{ marginRight: "6px" }} src={initState.user?.picture} />
      <span>{initState?.user?.nickName}</span>

    </div>
    <div style={{ flexShrink: 0 }}>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <SettingOutlined />
        </a>
      </Dropdown>
    </div>
  </div>;
};

export default GlobalAppBar;