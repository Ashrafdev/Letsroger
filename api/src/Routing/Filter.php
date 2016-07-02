<?php
namespace App\Routing\Filter;

use Cake\Event\Event;
use Cake\Routing\DispatcherFilter;

class CorsFilter extends DispatcherFilter
{

    public function beforeDispatch(Event $event)
    {
        if ($event->data['request']->is('OPTIONS')) {
            $event->stopPropagation();
            $event->data['response']->header(array(
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, PUT, DELETE, GET, HEAD',
                'Access-Control-Allow-Headers' => 'Origin, X-Requested-With, Content-Type, Authorization'
            ));
            return $event->data['response'];
        }
    }
}