/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#pragma once

#include <react/renderer/core/EventQueue.h>

namespace facebook {
namespace react {

/*
 * Event Queue that dispatches event in batches synchronizing them with
 * an Event Beat.
 */
class BatchedEventQueue final : public EventQueue {
 public:
  BatchedEventQueue(
      EventPipe eventPipe,
      StatePipe statePipe,
      std::unique_ptr<EventBeat> eventBeat);

  void onEnqueue() const override;
};

} // namespace react
} // namespace facebook
