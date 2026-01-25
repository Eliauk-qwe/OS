import React, { useState } from 'react';
import { Button, Input, Select, Modal } from '../components/common';

/**
 * ComponentDemo - 组件演示页面
 * 用于测试和展示通用UI组件
 */
const ComponentDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputError, setInputError] = useState('');
  
  const selectOptions = [
    { value: 'option1', label: '选项1' },
    { value: 'option2', label: '选项2' },
    { value: 'option3', label: '选项3' }
  ];
  
  const handleInputChange = (value) => {
    setInputValue(value);
    if (value.length < 3 && value.length > 0) {
      setInputError('输入至少需要3个字符');
    } else {
      setInputError('');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">通用UI组件演示</h1>
        
        {/* Button组件演示 */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Button 按钮组件</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">变体 (Variants)</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="primary" disabled>Disabled Button</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">尺寸 (Sizes)</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Input组件演示 */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Input 输入框组件</h2>
          
          <div className="space-y-4 max-w-md">
            <Input
              label="用户名"
              placeholder="请输入用户名"
              value={inputValue}
              onChange={handleInputChange}
              error={inputError}
              required
            />
            
            <Input
              type="tel"
              label="电话号码"
              placeholder="请输入电话号码"
            />
            
            <Input
              type="email"
              label="邮箱"
              placeholder="请输入邮箱"
              disabled
              value="disabled@example.com"
            />
          </div>
        </section>
        
        {/* Select组件演示 */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select 选择框组件</h2>
          
          <div className="space-y-4 max-w-md">
            <Select
              label="选择选项"
              options={selectOptions}
              value={selectValue}
              onChange={setSelectValue}
              placeholder="请选择一个选项"
              required
            />
            
            <Select
              label="禁用状态"
              options={selectOptions}
              value="option1"
              disabled
            />
          </div>
        </section>
        
        {/* Modal组件演示 */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Modal 模态框组件</h2>
          
          <div className="space-y-4">
            <Button onClick={() => setIsModalOpen(true)}>
              打开模态框
            </Button>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="示例模态框"
              size="medium"
            >
              <div className="space-y-4">
                <p className="text-gray-600">
                  这是一个模态框示例。您可以点击关闭按钮、按ESC键或点击背景来关闭它。
                </p>
                <p className="text-gray-600">
                  模态框支持焦点管理，打开时会捕获焦点，关闭时会恢复之前的焦点。
                </p>
                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    取消
                  </Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                    确认
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </section>
        
        {/* 可访问性说明 */}
        <section className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">可访问性特性</h2>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>所有按钮最小触摸目标为 44x44px（符合需求 6.6）</li>
            <li>所有交互元素具有一致的 hover 和 active 状态（符合需求 10.5）</li>
            <li>输入框和选择框支持 label 和错误消息显示（符合需求 9.1, 9.3）</li>
            <li>模态框支持 ESC 键关闭和焦点管理（符合需求 2.5）</li>
            <li>所有组件使用语义化 HTML 和 ARIA 属性</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ComponentDemo;
