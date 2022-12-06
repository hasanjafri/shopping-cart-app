import React from "react";
import { Modal, Form, Input } from "antd";

function LineItemModal({ visible, onOk, onCancel }) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Add New Line Item"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onOk(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          title: "",
          price: "",
          quantity: "",
          image: "",
          swatchColor: "",
          swatchTitle: "",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the line item title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please input the line item price!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            {
              required: true,
              message: "Please input the line item quantity!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: "Please input the line item image url!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="swatchColor"
          label="Swatch Color"
          rules={[
            {
              required: true,
              message: "Please input the line item swatch color!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="swatchTitle"
          label="Swatch Title"
          rules={[
            {
              required: true,
              message: "Please input the line item swatch title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LineItemModal;
