using IspoQueue.Features.Queue.DTO;

namespace IspoQueue.Features.Queue;

public record GetQueueResponse(List<QueueDTO> queues);