<?php
/**
 * Kebab Project
 *
 * LICENSE
 *
 * This source file is subject to the  Dual Licensing Model that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.kebab-project.com/cms/licensing
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to info@lab2023.com so we can send you a copy immediately.
 *
 * @category   Kebab
 * @package    Kebab
 * @subpackage Controllers
 * @author     Onur Özgür ÖZKAN <onur.ozgur.ozkan@lab2023.com>
 * @copyright  Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license    http://www.kebab-project.com/cms/licensing
 * @version    1.5.0
 */

/**
 * Kebab_ProfileController
 *
 * Member can change her/his password, first name, last name etc.
 *
 * @category   Kebab
 * @package    Kebab
 * @subpackage Controllers
 * @author     Onur Özgür ÖZKAN <onur.ozgur.ozkan@lab2023.com>
 * @copyright  Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license    http://www.kebab-project.com/cms/licensing
 * @version    1.5.0
 */
class Owg_TodoController extends Kebab_Rest_Controller
{
    public function indexAction()
    {
        $userSessionId = Zend_Auth::getInstance()->getIdentity()->id;

        $mapping  = array(
            'id'      => 'todo.id',
            'todo'    => 'todo.todo',
            'status'  => 'todo.status',
            'dueDate' => 'todo.dueDate'
        );
        
        $sort          = $this->_helper->sort($mapping);
        $search        = $this->_helper->search('Model_Entity_Todo');
        $options       = array('sort' => $sort, 'search' => $search);

        // Model
        $query         = Owg_Model_Todo::getAllByUserId($userSessionId, $options);
        $query         = $this->_helper->filter($query, $mapping);

        // Pager
        $pager         = $this->_helper->pagination($query);
        $retData       = $pager->execute(array(), Doctrine::HYDRATE_ARRAY);

        // Response
        $this->_helper->response(true, 200)->addData($retData)->addTotal($pager->getNumResults())->getResponse();
    }

    public function getAction()
    {
        $userSessionId = Zend_Auth::getInstance()->getIdentity()->id;
        $param = $this->_helper->param();
        $todoId = $param['id'];

        $todo = Doctrine_Core::getTable('Model_Entity_Todo')->find($todoId);

        if ($userSessionId != $todo->id) {
            throw new Kebab_Exception('User can see only his/her todos');
        }

        $this->_helper->response(200)->data($todo)->getResponse();
    }

    public function postAction(){}
    public function putAction(){}
    public function deleteAction(){}
}