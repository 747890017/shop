import Vue from 'vue'
import { Button } from 'element-ui'
import {Form,FormItem} from 'element-ui'
import {Input} from 'element-ui'
//引入消息弹窗
import { Message } from 'element-ui'
import { Container } from 'element-ui'
import { Header } from 'element-ui'
import { Aside } from 'element-ui'
import { Main } from 'element-ui'
import { Menu } from 'element-ui'
import { Submenu } from 'element-ui'
import { MenuItemGroup } from 'element-ui'
import { MenuItem } from 'element-ui'
import { Breadcrumb } from 'element-ui'
import { BreadcrumbItem } from 'element-ui' 
import { Card } from 'element-ui'
import { Row } from 'element-ui'
import { Col} from 'element-ui'
import { Table} from 'element-ui'
import { TableColumn} from 'element-ui'
import { Switch} from 'element-ui'
import { Tooltip} from 'element-ui'
import { Pagination} from 'element-ui'
import { Dialog} from 'element-ui'
import { MessageBox } from 'element-ui';
import { Tag } from 'element-ui';
import { Tree } from 'element-ui';
import { Select } from 'element-ui';
import { Option } from 'element-ui';
import { Carousel } from 'element-ui'
import { CarouselItem } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm