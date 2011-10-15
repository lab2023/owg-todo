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
        // Get User SessionId
        $userSessionId = Zend_Auth::getInstance()->getIdentity()->id;

        // Mapping
        $mapping  = array(
            'id'      => 'todo.id',
            'todo'    => 'todo.todo',
            'status'  => 'todo.status',
            'dueDate' => 'todo.dueDate',
            'created_at' => 'todo.created_at'
        );

        // Options
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
        // Get User Session
        $userSessionId = Zend_Auth::getInstance()->getIdentity()->id;

        // Get todo Id
        $param = $this->_helper->param();
        $todoId = $param['id'];

        // Get Todo Object
        $todo = Doctrine_Core::getTable('Model_Entity_Todo')->find($todoId);

        // Check user's todo
        if ($userSessionId != $todo['created_by']) {
            throw new Kebab_Exception('User can see only his/her todos');
        }

        // Response
        $this->_helper->response(200)->data($todo)->getResponse();
    }

    public function postAction()
    {
        // Get Param
        $params = $this->_helper->param();

        // Create todo entity
        $todo = new Model_Entity_Todo();
        $todo->todo = $params['todo'];
        if (array_key_exists('dueDate', $params)) {
            $todo->dueDate = $params['dueDate'];
        }
        $todo->status = 1;
        $todo->save();

        // Response
        $this->_helper->response(true, 201)->addNotification(Kebab_Notification::INFO, 'Todo is created.')->getResponse();
    }

    public function putAction()
    {
       // Getting parameters
        $params = $this->_helper->param();

        // Convert data collection array if not
        $collection = $this->_helper->array()->isCollection($params['data'])
                ? $params['data']
                : $this->_helper->array()->convertRecordtoCollection($params['data']);

        // Updating status
        Doctrine_Manager::connection()->beginTransaction();
        try {
            // Doctrine
            foreach ($collection as $record) {
                $todo = new Model_Entity_Todo();
                $todo->assignIdentifier($record['id']);
                if (array_key_exists('todo', $record)) {
                    $todo->set('todo', $record['todo']);
                }

                if (array_key_exists('dueDate', $record)) {
                    $todo->set('dueDate', $record['dueDate']);
                }

                if (array_key_exists('status', $record)) {
                    $todo->set('status', $record['status']);
                }
                $todo->save();
            }
            Doctrine_Manager::connection()->commit();

            // Response
            $this->_helper->response(true, 202)->getResponse();

        } catch (Zend_Exception $e) {
            Doctrine_Manager::connection()->rollback();
            throw $e;
        } catch (Doctrine_Exception $e) {
            Doctrine_Manager::connection()->rollback();
            throw $e;
        }
    }

    public function deleteAction()
    {
        // Params
        $params = $this->_helper->param();

        // Convert array
        $ids = $this->_helper->array()->convertArray($params['data']);

        // Dql
        Doctrine_Query::create()
                ->delete()
                ->from('Model_Entity_Todo todo')
                ->whereIn('todo.id', $ids)
                ->useQueryCache(Kebab_Cache_Query::isEnable())
                ->execute();

        // Response
        $this->_helper->response(true, 204)->addNotification(Kebab_Notification::INFO, 'Record was deleted.')->getResponse();
    }
}