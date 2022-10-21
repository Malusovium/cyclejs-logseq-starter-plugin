import '@logseq/libs'
import xs from 'xstream'
import { deepEqual } from 'fast-equals'

// const produceEvent = () => {}

// SinkMessage
// {
//   action: ['app', 'get_info'],
//   data: {}
// }

// SourceMessage
// {
//   action: ['app', 'get_info'],
//   data: {}
// }
const todo = (a) => {
  console.info(`TODO: ${a}`)
} 

// false || handle
const handler = (action_type) => ([[sub_action_type, handle], ...rest]) => (source_action_type) => {
  // console.log([action_type, sub_action_type], source_action_type, deepEqual(action_type))
  if (deepEqual([action_type, sub_action_type], source_action_type)) {
    // console.log(action_type, source_action_type, handle)
    // console.log(handle)
    return handle
  } else if (rest.length === 0) {
    return false
  } else {    
    console.log(rest)
    return handler(action_type)(rest)(source_action_type)
  }
}

const super_handler = (error_handle) => ([head, ...rest]) => (action_type) => {
  // console.log(head, ...rest)
  if (head === undefined) {
    console.log('error_handle', action_type)
    return error_handle
  } else {
    const maybe_handle = head(action_type)
    // console.log('mayb', action_type, maybe_handle, !maybe_handle, !!maybe_handle)

    if (!!maybe_handle) {
    // if (maybe_handle) {
      console.log('maybe_handle', action_type)
      return maybe_handle
    } else {    
      // console.log('next_handle', action_type)
      return super_handler(error_handle)(rest)(action_type)
    }
  }
}
  
const make_message =
  (space = '*') =>
  (root) =>
  (action) =>
  (data) => ({
  action: [root, action],
  data: data
})
  
const logseq_base_info =
  (pe) =>
  (space) =>
  () => {
  console.log('called base_info')
  pe(
    make_message
    (space)
    ('logseq')
    ('base_info')
    (logseq.baseInfo)
    
  ) 
}
  
const logseq_caller =
  (pe) =>
  (space) =>
  () => {
  pe(
    make_message
    (space)
    ('logseq')
    ('caller')
    (logseq.caller)
  )
}

const logseq_connected =
  (pe) =>
  (space) =>
  () => {
  pe(
    make_message
    (space)
    ('logseq')
    ('connected')
    (logseq.connected)
  )
}

const logseq_is_main_ui_visible =
  (pe) =>
  (space) =>
  () => {
  pe(
    make_message
    (space)
    ('logseq')
    ('connected')
    (logseq.isMainUIVisible)
  )
}

const logseq_settings =
  (pe) =>
  (space) =>
  () => {
  pe(
    make_message
    (space)
    ('logseq')
    ('settings')
    (logseq.settings)
  )
}

const logseq_hide_main_ui =
  (pe) =>
  (space) =>
  (opts) => {
  logseq.hideMainUI(opts)
  pe(
    make_message
    (space)
    ('logseq')
    ('hide_main_ui')
    ()
  )
}

const logseq_hide_settings_ui =
  (pe) =>
  (space) =>
  () => {
  logseq.hideSettingsUI()
  pe(
    make_message
    (space)
    ('logseq')
    ('hide_settings_ui')
    ()
  )
}

// todo
const logseq_on_settings_changed =
  (pe) =>
  (space) =>
  () => {
    todo('logseq_on_settings_changed')
  // logseq.onSettingsChanged(
    
  // )
}

const logseq_provide_model =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_provide_model')
}

const logseq_provide_style =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_provide_style')
}

const logseq_provide_theme =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_provide_theme')
}

const logseq_provide_ui =
  (pe) =>
  (space) =>
  () => {
  todo('logeq_provide_ui')
}

const logseq_resolve_resource_full_url =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_resolve_resource_full_url')
}

const logseq_set_main_ui_attrs =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_set_main_ui_attrs')
}

const logseq_set_main_ui_inline_style =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_set_main_ui_inline_style')
}

const logseq_show_main_ui =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_show_main_ui')
}

const logseq_show_settings_ui =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_show_settings_ui')
}

const logseq_toggle_main_ui =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_toggle_main_ui')
}

const logseq_update_settings =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_update_settings')
}

const logseq_use_settings_schema =
  (pe) =>
  (space) =>
  () => {
  todo('logseq_use_settings_schema')
}

// uuid?
const app_on_block_rendered_slotted =
  (pe) =>
  (space) =>
  ({message}) => {
  logseq.App.onBlockRenderedSlotted((e) => {
    pe(
      make_message
      (space)
      ('app')
      ('on_block_rendered_slotted')
      (message))  
  })
}
  
const app_on_current_graph_changed =
  (pe) =>
  (space) =>
  ({message}) => {
  logseq.App.onCurrentGraphChanged((e) => {
    pe(
      make_message
      (space)
      ('app')
      ('on_current_graph_changed')
      (message))
  })
}

const app_on_macro_renderer_slotted =
  (pe) =>
  (space) =>
  () => {
  todo('app_on_macro_renderer_slotted')
}

const app_on_page_head_actions_slotted =
  (pe) =>
  (space) =>
  () => {
  todo('app_on_page_head_actions_slotted')
}

const app_on_route_changed =
  (pe) =>
  (space) =>
  () => {
  todo('app_on_route_changed')
}

const app_on_sidebar_visible_changed =
  (pe) =>
  (space) =>
  () => {
  todo('app_on_sidebar_visible_changed')
}

const app_on_theme_mode_changed =
  (pe) =>
  (space) =>
  () => {
  todo('app_on_theme_mode_changed')
}

const app_get_current_graph =
  (pe) =>
  (space) =>
  () => {
  todo('app_get_current_graph')
}

const app_get_info  =
  (pe) =>
  (space) =>
  () => {
  todo('app_get_info')
}

const app_get_state_from_store =
  (pe) =>
  (space) =>
  () => {
  todo('app_get_state_from_store')
}

const app_get_user_configs =
  (pe) =>
  (space) =>
  () => {
  todo('app_get_user_configs')
}

const app_get_user_info =
  (pe) =>
  (space) =>
  () => {
  todo('app_get_user_info')
}

const app_invoke_external_command =
  (pe) =>
  (space) =>
  () => {
  todo('app_invoke_external_command')
}

const app_open_external_link =
  (pe) =>
  (space) =>
  () => {
  todo('app_open_external_link')
}

const app_push_state =
  (pe) =>
  (space) =>
  () => {
  todo('app_push_state')
}

const app_query_element_by_id =
  (pe) =>
  (space) =>
  () => {
  todo('app_query_element_by_id')
}

const app_query_element_rect =
  (pe) =>
  (space) =>
  () => {
  todo('app_query_element_rect')
}

const app_quit =
  (pe) =>
  (space) =>
  () => {
  todo('app_quit')
}

const app_register_command =
  (pe) =>
  (space) =>
  () => {
  todo('app_register_command')
}

const app_register_command_palette =
  (pe) =>
  (space) =>
  () => {
  todo('app_register_command_palette')
}

const app_register_command_shortcut =
  (pe) =>
  (space) =>
  () => {
  todo('app_register_command_shortcut')
}

const app_register_page_menu_item =
  (pe) =>
  (space) =>
  () => {
  todo('app_register_page_menu_item')
}

const app_register_ui_item =
  (pe) =>
  (space) =>
  () => {
  todo('app_register_ui_item')
}

const app_relaunch =
  (pe) =>
  (space) =>
  () => {
  todo('app_relaunch')
}

const app_replace_state =
  (pe) =>
  (space) =>
  () => {
  todo('app_replace_state')
}

const app_set_fullscreen =
  (pe) =>
  (space) =>
  () => {
  todo('app_set_fullscreen')
}

const app_set_left_sidebar_visible =
  (pe) =>
  (space) =>
  () => {
  todo('app_set_left_sidebar_visible')
}

const app_set_right_sidebar_visible =
  (pe) =>
  (space) =>
  () => {
  todo('app_set_right_sidebar_visible')
}

const app_set_zoom_factor =
  (pe) =>
  (space) =>
  () => {
  todo('app_set_zoom_factor')
}

const editor_on_input_selection_end =
  (pe) =>
  (space) =>
  () => {
  todo('editor_on_input_selection_end')
}

const editor_append_block_in_page =
  (pe) =>
  (space) =>
  () => {
  todo('editor_append_block_in_page')
}

const editor_check_editing =
  (pe) =>
  (space) =>
  () => {
  todo('editor_check_editing')
}

const editor_create_page =
  (pe) =>
  (space) =>
  ({page_name, opts}) => {
  logseq.createPage(page_name, opts)
  .then(
    make_message
    (space)
    ('editor')
    ('create_page'))
  .then(pe)
}
const editor_delete_page = (pe) => ({page_name}) => {
  logseq.deletePage(page_name)
  .then(() =>
    make_message
    (space)
    ('editor')
    ('delete_page')
    (page_name))
  .then(pe)
}

const editor_edit_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_edit_block')
}

const editor_exit_editing_mode =
  (pe) =>
  (space) =>
  () => {
  todo('editor_exit_editing_mode')
}

const editor_get_all_pages =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_all_pages')
}

const editor_get_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_block')
}

const editor_get_block_properties =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_block_properties')
}

const editor_get_block_property =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_block_property')
}

const editor_get_current_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_current_block')
}

const editor_get_current_page =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_current_page')
}

const editor_get_current_page_blocks_tree =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_current_page_blocks_tree')
}

const editor_get_editing_block_content =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_editing_block_content')
}

const editor_get_editing_cursor_position =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_editing_cursor_position')
}

const editor_get_next_sibling_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_next_sibling_block')
}

const editor_get_page =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_page')
}

const editor_get_page_blocks_tree =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_page_blocks_tree')
}

const editor_get_page_linked_references =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_page_linked_references')
}

const editor_get_pages_from_namespace =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_pages_from_namespace')
}

const editor_get_pages_tree_from_namespace =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_pages_tree_from_namespace')
}

const editor_get_previous_sibling_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_previous_sibling_block')
}

const editor_get_selected_blocks =
  (pe) =>
  (space) =>
  () => {
  todo('editor_get_selected_blocks')
}

const editor_insert_at_editing_cursor =
  (pe) =>
  (space) =>
  () => {
  todo('editor_insert_at_editing_cursor')
}

const editor_insert_batch_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_insert_batch_block')
}

const editor_insert_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_insert_block')
}

const editor_move_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_move_block')
}

const editor_open_in_right_side_bar =
  (pe) =>
  (space) =>
  () => {
  todo('editor_open_in_right_side_bar')
}

const editor_prepend_block_in_page =
  (pe) =>
  (space) =>
  () => {
  todo('editor_prepend_block_in_page')
}

const editor_register_block_context_menu_item =
  (pe) =>
  (space) =>
  () => {
  todo('editor_register_block_context_menu_item')
}

const editor_register_slash_command =
  (pe) =>
  (space) =>
  () => {
  todo('editor_register_slash_command')
}

const editor_remove_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_remove_block')
}

const editor_remove_block_property =
  (pe) =>
  (space) =>
  () => {
  todo('editor_remove_block_propery')
}

const editor_rename_page =
  (pe) =>
  (space) =>
  () => {
  todo('editor_rename_page')
}

const editor_restore_editing_cursor =
  (pe) =>
  (space) =>
  () => {
  todo('editor_restore_editing_cursor')
}

const editor_scroll_to_block_in_page =
  (pe) =>
  (space) =>
  () => {
  todo('editor_scroll_to_block_in_page')
}

const editor_set_block_collapsed =
  (pe) =>
  (space) =>
  () => {
  todo('editor_set_block_collapsed')
}

const editor_update_block =
  (pe) =>
  (space) =>
  () => {
  todo('editor_update_block')
}

const editor_upsert_block_propery =
  (pe) =>
  (space) =>
  () => {
  todo('editor_upsert_block_propery')
}

// e -> {block_entity, tx_data, tx_meta}
const db_on_changed =
  (pe) =>
  (space) =>
  (_) => {
  logseq.DB.onChanged((e) => {
    pe(
      make_message
      (space)
      ('db')
      ('on_changed')
      ('changes'))  
  })   
}
  
const db_datascript_query =
  (pe) =>
  (space) =>
  ({query, inputs}) => {
  logseq.DB.datascriptQuery(query, ...inputs)
  .then(
    make_message
    (space)
    ('db')
    ('datascript_query'))   
  .then(pe)
}

const db_on_block_changed =
  (pe) =>
  (space) =>
  ({uuid}) => {
   logseq.DB.onBlockChanged(uuid, () => {
    pe(
      make_message
      (space)
      ('db')
      ('on_block_changed')
      (uuid)
    )
  }) 
}

const db_q =
  (pe) =>
  (space) =>
  (dsl) => {
  logseq.DB.q(dsl)
  .then(
    make_message
    (space)
    ('db')
    ('q')
  )
  .then(pe)
}
   
// git //

const ui_close_message =
  (_) =>
  (_space) =>
  (message) => {
  logseq.UI.closeMsg(message)
}

const ui_show_message =
  (_) =>
  (_space) =>
  (message) => {
  console.log('came at show message')
  logseq.UI.showMsg(message)
}

const make_logseqqer = () => {
  let receiver = () => {}
  
  const handle_logseq = 
    [ [ 'base_info', logseq_base_info ]
    , [ 'caller', logseq_caller ]
    , [ 'connected', logseq_connected]
    , [ 'is_main_ui_visible', logseq_is_main_ui_visible]
    , [ 'settings', logseq_settings ]
    , [ 'hide_main_ui', logseq_hide_main_ui ]
    , [ 'hide_settings_ui', logseq_hide_settings_ui ]
    , [ 'on_settings_changed', logseq_on_settings_changed]
    , [ 'provide_model', logseq_provide_model ]
    , [ 'provide_style', logseq_provide_style ]
    , [ 'provide_theme', logseq_provide_theme ]
    , [ 'provide_ui', logseq_provide_ui ]
    , [ 'resolve_resource_full_url', logseq_resolve_resource_full_url]
    , [ 'set_main_ui_attrs', logseq_set_main_ui_attrs ]
    , [ 'set_main_ui_inline_style', logseq_set_main_ui_inline_style ]
    , [ 'show_main_ui', logseq_show_main_ui ]
    , [ 'show_settings_ui', logseq_show_settings_ui ]
    , [ 'toggle_main_ui', logseq_toggle_main_ui ]
    , [ 'update_settings', logseq_update_settings ]
    , [ 'use_settings_schema', logseq_use_settings_schema ]
    ]

  const handle_app =
    [ [ 'on_block_rendered_slotted', app_on_block_rendered_slotted ]
    , [ 'on_current_graph_changed', app_on_current_graph_changed ]  
    , [ 'on_macro_renderer_slotted', app_on_macro_renderer_slotted ]
    , [ 'on_page_head_actions_slotted', app_on_page_head_actions_slotted ]
    , [ 'on_route_changed', app_on_route_changed]
    , [ 'on_sidebar_visible_changed', app_on_sidebar_visible_changed]
    , [ 'app_on_theme_mode_changed', app_on_theme_mode_changed ]
    , [ 'get_current_graph', app_get_current_graph ]
    , [ 'get_info', app_get_info ]
    , [ 'get_state_from_store', app_get_state_from_store ]
    , [ 'get_user_configs', app_get_user_configs ]
    , [ 'get_user_info', app_get_user_info ]
    , [ 'invoke_external_command', app_invoke_external_command ]
    , [ 'open_external_link', app_open_external_link ]
    , [ 'push_state', app_push_state ]
    , [ 'query_element_by_id', app_query_element_by_id ]
    , [ 'query_element_rect', app_query_element_rect ]
    , [ 'register_command', app_register_command ]
    , [ 'register_command_palette', app_register_command_palette ]
    , [ 'register_command_shortcut', app_register_command_shortcut ]
    , [ 'register_page_menu_item', app_register_page_menu_item ]
    , [ 'app_register_ui_item', app_register_ui_item ]
    , [ 'app_relaunch', app_relaunch ]
    , [ 'replace_state', app_replace_state ]
    , [ 'set_fullscreen', app_set_fullscreen ]
    , [ 'set_left_sidebar_visible', app_set_left_sidebar_visible ]
    , [ 'set_right_sidebar_visible', app_set_right_sidebar_visible ]
    , [ 'set_zoom_factor', app_set_zoom_factor ]
    , [ 'app_quit', app_quit ]
    ]
  
  const handle_editor = 
    [ [ 'create_page', editor_create_page ]
    , [ 'delete_page', editor_delete_page ]  
    , [ 'on_input_selection_end', editor_on_input_selection_end ]
    , [ 'append_block_in_page', editor_append_block_in_page ]
    , [ 'check_editing', editor_check_editing ]
    , [ 'edit_block', editor_edit_block ]
    , [ 'exit_editing_mode', editor_exit_editing_mode ]
    , [ 'get_all_pages', editor_get_all_pages ]
    , [ 'get_block', editor_get_block ]
    , [ 'get_block_properties', editor_get_block_properties ]
    , [ 'get_block_property', editor_get_block_property ]
    , [ 'get_current_block', editor_get_current_block ]
    , [ 'get_current_page', editor_get_current_page ]
    , [ 'get_current_page_blocks_tree', editor_get_current_page_blocks_tree ]
    , [ 'get_editing_block_content', editor_get_editing_block_content ]
    , [ 'get_editing_cursor_position', editor_get_editing_cursor_position ]
    , [ 'get_next_sibling_block', editor_get_next_sibling_block ]
    , [ 'get_page', editor_get_page ]
    , [ 'get_page_blocks_tree', editor_get_page_blocks_tree ]
    , [ 'get_page_linked_references', editor_get_page_linked_references ]
    , [ 'get_pages_from_namespace', editor_get_pages_from_namespace ]
    , [ 'get_pages_tree_from_namespace', editor_get_pages_tree_from_namespace ]
    , [ 'get_previous_sibling_block', editor_get_previous_sibling_block ]
    , [ 'get_selected_blocks', editor_get_selected_blocks ]
    , [ 'insert_at_editing_cursor', editor_insert_at_editing_cursor ]
    , [ 'insert_batch_block', editor_insert_batch_block ]
    , [ 'insert_block', editor_insert_block ]
    , [ 'move_block', editor_move_block ]
    , [ 'open_in_right_side_bar', editor_open_in_right_side_bar ]
    , [ 'prepend_block_in_page', editor_prepend_block_in_page ]
    , [ 'register_block_context_menu_item', editor_register_block_context_menu_item ]
    , [ 'register_slash_command', editor_register_slash_command ]
    , [ 'remove_block', editor_remove_block ]
    , [ 'remove_block_property', editor_remove_block_property ]
    , [ 'rename_page', editor_rename_page]
    , [ 'restore_editing_cursor', editor_restore_editing_cursor]
    , [ 'scroll_to_block_in_page', editor_scroll_to_block_in_page]
    , [ 'set_block_collapsed', editor_set_block_collapsed]
    , [ 'update_block', editor_update_block]
    , [ 'upsert_block_propery', editor_upsert_block_propery]
    ]

 
  
  
  
  

  const handle_db = 
    [ [ 'on_changed', db_on_changed ]
    , [ 'datascript_query', db_datascript_query ]
    , [ 'on_block_changed', db_on_block_changed ]
    , [ 'q', db_q ]
    ]

  const handle_git = 
    [ [ '...', () => {}]
    ]

  const handle_ui = 
    [ [ 'close_message', ui_close_message ]
    , [ 'show_message', ui_show_message ]
    ]

  const handle = ({action, scope, data}) => {

    // console.log(      
    //   super_handler
    //   ((_) => (_) => (a) => console.error(a))
    //   ( [ handler('logseq')(handle_logseq)
    //     , handler('app')(handle_app)
    //     , handler('editor')(handle_editor)
    //     , handler('db')(handle_db)
    //     , handler('git')(handle_git)
    //     , handler('ui')(handle_ui)
    //     ]
    //   )
    //   (action[0])
    //   (action[1])
    //   (receiver)
    //   (data)
    // )

    super_handler
    ((_) => (a) => { console.error(a) })
    ( [ handler('logseq')(handle_logseq)
      , handler('app')(handle_app)
      , handler('editor')(handle_editor)
      , handler('db')(handle_db)
      , handler('git')(handle_git)
      , handler('ui')(handle_ui)
      ]
    )
    (action)
    (receiver)
    (scope)
    (data)
  }
  
  // console.log(logseq.baseInfo)
  // receiver = (a) => console.log('receive', a)
  // handle({action: ['logseq', 'base_info']})
  
  return (
    { add_receiver: (new_receiver) => {  
        console.log('added receiver')
        receiver = new_receiver
      }
    , remove_receiver: () => {
        console.log('removed receiver')
        receiver = () => {}
      }
    , handle: handle
    }
  )
}

const make_logseq_driver = ({
  model,
  main_ui_inline_style,
  style,
  ui_item,
}) => {
  if (!!model) {  
    logseq.provideModel(model)
  } 
  if (!!main_ui_inline_style) {    
    logseq.setMainUIInlineStyle(main_ui_inline_style)
  }
  if (!!style) {    
    logseq.provideStyle(style)
  }

  if (!!ui_item) {
    logseq.App.registerUIItem('toolbar', ui_item)
  }
    
  let logseqqer = make_logseqqer()

  const logseq_driver = in$ => {
    in$.addListener({
      next: message => {
        console.log('logseq-driver', message)
        logseqqer.handle(message)
      },
      error: (e) => { console.error('logseq-driver', e) },
      complete: () => { console.info('logseq-driver', 'completed') }
    })
  
    const out$ = xs.create({
      start: listener => {
        console.log('hi')
        logseqqer.add_receiver((a) => {
          listener.next(a)
          console.log('listened to message', a)
        })
        // listener.next({message: 'hi'})
        // produceEvent(listener.next)
      },
      stop: () => {
          logseqqer.remove_receiver()
        }
    })

    return out$
  }
    
  return logseq_driver
}

const run_logseq = (main) => logseq.ready(main).catch(console.error)
const derun_logseq = (de_main) => logseq.beforeunload(de_main).catch(console.error)


export {
  make_logseq_driver,
  run_logseq,
  derun_logseq
}

