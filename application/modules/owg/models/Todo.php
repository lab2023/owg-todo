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
 * @category   
 * @package    
 * @subpackage 
 * @author     Onur Özgür ÖZKAN <onur.ozgur.ozkan@lab2023.com>
 * @copyright  Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license    http://www.kebab-project.com/cms/licensing
 * @version    1.5.0
 */
 
/**
 * 
 *
 * @category   
 * @package    
 * @subpackage 
 * @author     Onur Özgür ÖZKAN <onur.ozgur.ozkan@lab2023.com>
 * @copyright  Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license    http://www.kebab-project.com/cms/licensing
 * @version    1.5.0
 */
class Owg_Model_Todo
{
    public static function getAllByUserId($userId, $options)
    {
        $query = Doctrine_Query::create()
                ->select('*')
                ->from('Model_Entity_Todo todo')
                ->where('todo.created_by = ?', $userId)
                ->useQueryCache(Kebab_Cache_Query::isEnable());

        if (array_key_exists('sort', $options)) {
            $query->orderBy($options['sort']);
        }

        if (array_key_exists('search', $options)) {
            $query->whereIn('todo.id', $options['search']);
        }

        return $query;
    }
}
