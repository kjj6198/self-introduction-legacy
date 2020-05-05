function intersection(node, params) {
  if (window) {
    const observer = new window.IntersectionObserver(params.handleIntersect, {
      threshold: params.threshold || 0.2,
    });

    observer.observe(node);

    return {
      destroy: () => observer.unobserve(node),
    };
  }

  return {
    destroy: () => {},
  };
}

module.exports = { intersection };
